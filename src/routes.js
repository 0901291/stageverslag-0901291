import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import App from './components/App';
import ManageAchievementPage from './components/achievement/ManageAchievementPage'; // Add/edit achievement
import Achievement from './components/achievement/Achievement'; // Achievement detail
import ManageLogPage from './components/log/ManageLogPage'; // Add/edit log
import Log from './components/log/Log'; // Log detail
import ManagePagePage from './components/page/ManagePagePage'; // Add/edit page
import Page from './components/page/Page'; // Page detail

export default (
  <Route path="/" component={App}>
      <Redirect from="home" to="/"/>
      <IndexRoute page="home" component={Page}/>
      <Route path="achievements/add" component={ManageAchievementPage}/>
      <Route path="achievements/:id/edit" component={ManageAchievementPage}/>
      <Route path="achievements/:id" component={Achievement} />
      <Route path="logs/add" component={ManageLogPage}/>
      <Route path="logs/:id/edit" component={ManageLogPage}/>
      <Route path="logs/:id" component={Log} />
      <Route path="pages/add" component={ManagePagePage}/>
      <Route path="pages/:id/edit" component={ManagePagePage}/>
      <Route path=":id" component={Page}/>
      <Route path=":id/edit" component={ManagePagePage}/>
      <Redirect from="/pages/:id" to="/:id"/>
      <Route path="/pages/:id" component={Page}/>
      <Route path="notfound" page="notfound" component={Page}/>
  </Route>
);