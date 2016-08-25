import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const pages = [
  {
    id: "home",
    title: "Home",
    body: "This site gives you a 'behind the scenes' of my internship at Burst...",
    type: "basic",
    overview_type: "",
    access: true,
    show_nav: true,
    content_type: 'page'
  },
  {
    id: "logs",
    title: "Blog",
    body: "Read about my days at Burst...",
    type: "overview",
    overview_type: "log",
    access: true,
    show_nav: true,
    content_type: 'page'
  },
  {
    id: "achievements",
    title: "Achievements",
    body: "Read about my accomplished and yet to accomplish achievements during my internship at Burst...",
    type: "overview",
    overview_type: "achievement",
    access: true,
    show_nav: true,
    content_type: 'page'
  },
  {
    id: "pages",
    title: "Pages",
    body: "Manage pages of internshipship site",
    type: "overview",
    overview_type: "page",
    access: false,
    show_nav: true,
    content_type: 'page'
  },
  {
    id: "notfound",
    title: "Oops.. Not found",
    body: "This page either does not exist, or was removed. Please go back to the home page.",
    type: "basic",
    overview_type: "",
    access: false,
    show_nav: false,
    content_type: 'page'
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (page) => {
  return replaceAll(page.title, ' ', '-').toLowerCase();
};

class PageApi {
  static getAllPages() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], pages));
      }, delay);
    });
  }

  static savePage(page) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minPageTitleLength = 1;
        if (page.title.length < minPageTitleLength) {
          reject(`Title must be at least ${minPageTitleLength} characters.`);
        }

        if (page.id) {
          const existingPageIndex = pages.findIndex(a => a.id == page.id);
          pages.splice(existingPageIndex, 1, page);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new pages in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          page.id = generateId(page);
          page.content_type = 'page';
          pages.push(page);
        }

        resolve(Object.assign({}, page));
      }, delay);
    });
  }

  static deletePage(pageId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfPageToDelete = pages.findIndex(page => {
          page.pageId == pageId;
        });
        pages.splice(indexOfPageToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default PageApi;
