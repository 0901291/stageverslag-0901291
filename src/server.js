import express from 'express';
import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import configureServer from '../tools/server/configureServer';
import initialState from './reducers/initialState';

const app = express();

app.use(configureServer());

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);
app.set('port', (process.env.PORT || 5000));

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (!props) {
      res.status(404).render('404');
    } else {
      // Set initialState here if needed.

      const store = configureStore(initialState);
      const react = (
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      );

      const reactString = renderToString(react);
      const finalState = store.getState();

      console.log('finalState', finalState);

      res.render('index', { reactString, finalState });
    }
  });
});

app.listen(app.get('port'), error => {
  if (error) {
    console.log(error);  // eslint-disable-line no-console
  } else {
    console.log(`Listening at port ${app.get('port')}`);
  }
});
