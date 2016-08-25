import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
// import ManageAchievementPage from './components/achievement/ManageAchievementPage'; // Add/edit achievement
// import AchievementPage from './components/achievement/AchievementPage'; // Achievement detail
import ManagePagePage from './components/page/ManagePagePage'; // Add/edit page
import Page from './components/page/Page'; // Page detail

export default (
    <Route path="/" component={App}>
        <IndexRoute page="home" component={Page} />
        {/*<Route path="achievements/add" component={ManageAchievementPage} />*/}
        {/*<Route path="achievements/:id/edit" component={ManageAchievementPage} />*/}
        {/*<Route path="achievements/:id" component={AchievementPage} />*/}
        <Route path="pages/add" component={ManagePagePage} />
        <Route path="pages/:id/edit" component={ManagePagePage} />
        <Route path=":page" component={Page} />
        <Route path="notfound" page="notfound" component={Page} />
    </Route>
);