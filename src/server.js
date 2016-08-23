import express from 'express';
import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import configureServer from '../tools/server/configureServer.js';

const app = express();

app.use(configureServer());

// console.log('port 1', process.env.PORT);
// console.log('pocess env 1', process.env);
// console.log('process', process);
// console.log('processproces', process.process);
console.log('----------- BEGIN ----------------');
for(var key in process) {
  console.log(key, process[key]);
}
console.log('----------- END ----------------');
// console.log('process env 2', process.env);
// console.log('port 2', process.env.PORT);
// console.log('title', process.title);
// console.log('env', process.env.NODE_ENV);
// console.log('port 3', process.env.PORT);
// console.log('port or:', process.env.PORT || 1234);

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);
app.set('port', (process.env.PORT || 8080));

exports.isProd = process.env.NODE_ENV === 'production';
exports.isHeroku = process.env.DYNO;
exports.host = undefined;
exports.ports = {
  http: exports.isProd ? process.env.PORT || 80 : 9100,
  https: exports.isProd ? process.env.PORT || 443 : 9101
};

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (!props) {
      res.status(404).render('404');
    } else {
      // Set initialState here if needed.
      const initialState = {};
      
      const store = configureStore(initialState);
      const react = (
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      );

      const reactString = renderToString(react);
      const finalState = store.getState();

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
