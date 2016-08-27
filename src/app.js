import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {loadAchievements} from './actions/achievementActions';
import {loadPages} from './actions/pageActions';
import {loadLogs} from './actions/logActions';

import './styles/styles.scss';

const serverState = JSON.stringify(window.INITIAL_STATE);
const localStorageCopy = typeof localStorage !== 'undefined' ? localStorage.getItem('stageverslagState') : serverState ||  serverState;
// Get the initial state of the app injected at server render.
const initialState = JSON.parse(localStorageCopy);
const store        = configureStore(initialState);

if(!Object.keys(initialState).length || !initialState.pages.length) {
    store.dispatch(loadAchievements());
    store.dispatch(loadPages());
    store.dispatch(loadLogs());
}

render(
  <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);