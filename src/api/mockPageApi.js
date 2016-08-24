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
    access: "true"
  },
  {
    id: "logs",
    title: "Blog",
    body: "Read about my days at Burst...",
    type: "overview",
    overview_type: "log",
    access: "true"
  },
  {
    id: "achievements",
    title: "Achievements",
    body: "Read about my accomplished and yet to accomplish achievements during my internship at Burst...",
    type: "overview",
    overview_type: "achievement",
    access: "true"
  },
  {
    id: "pages",
    title: "Pages",
    body: "Manage pages of internshipship site",
    type: "overview",
    overview_type: "page",
    access: "false"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (page) => {
  return replaceAll(page.title, ' ', '-');
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
