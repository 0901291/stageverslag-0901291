# Stageverslag-0901291

Find a demo of this app <a href="https://stageverslag-0901291.herokuapp.com" target="_blank">right here</a>.

Stageverslag-0901291 is a web-app in ReactJS with the power of Redux behind it. With this app you can manage your internship. You can manage which achievements you can accomplish during this internship and what your status is per achievement. You can add pages to simply show some text, and overview pages to list a certain type on (achievements, logs or pages).

## Features
- Manage (add/edit/delete) pages and your app's header
- Manage (add/edit/delete) achievements with a state (to do/in progress/done)
- Manage (add/edit/delete) log items to blog about your days at the company
- Add references of pages and log items to your achievement to show where you worked on achieving the achievement.
- Toggle logged in state to see what your app looks like when you're not logged in
- Default data is visible, but can all be deleted. The entire portfolio is stored in your browser's localStorage, so none of your data is visible to the outside world.
- The project is using the ES6/ES2015 syntax for JavaScript and transpiling the code back to ES5 using babel with Webpack. The project is managed with NPM.
- Server side rendering is built in into the application to serve crawlers such as Google and offer basic support to people browsing without JavaScript enabled. Please note that data you add or edit in the application, is not rendered on the server because of it being in your browser's storage. Only default data is visible server side.
- Styling is done through SASS.
- Heroku support is already built in to make it as easy as possible to launch your app into the world wide web.

## Usage
1. Clone the repo.
2. `cd` into the repo and `npm install`.
3. For local use, run `npm start` on the repo folder and visit `http://localhost:5000` to see your app.
4. For production use, you can push the repo to a service like Heroku. Heroku support is already built in in this repo.

## README for school

## Troubleshooting
#### "I lost the ability to add pages because I removed the pages page"
 Don't worry. When you delete the /pages page, just go to /pages/add and add a new page with Page Type `Overview page` and Overview Type `Pages`. If you name this page `Pages` a new overview page will be visible again at /pages. Note that this page should be in the navigation, but not accessible. You could always just run `localStorage.clear()` inside your browser's console to reset the entire application to default data.
#### "I lost the ability to create or add anything"
Just click on the `You are currently logged in` button in the upper right of the page to toggle your logged in state. Once you are 'logged in', you can create and edit again.