import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const pages = [
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref: "http://www.pluralsight.com/pages/react-flux-building-applications",
    authorId: "cory-house",
    length: "5:08",
    category: "JavaScript"
  },
  {
    id: "clean-code",
    title: "Clean Code: Writing Code for Humans",
    watchHref: "http://www.pluralsight.com/pages/writing-clean-code-humans",
    authorId: "cory-house",
    length: "3:10",
    category: "Software Practices"
  },
  {
    id: "architecture",
    title: "Architecting Applications for the Real World",
    watchHref: "http://www.pluralsight.com/pages/architecting-applications-dotnet",
    authorId: "cory-house",
    length: "2:52",
    category: "Software Architecture"
  },
  {
    id: "career-reboot-for-developer-mind",
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    watchHref: "http://www.pluralsight.com/pages/career-reboot-for-developer-mind",
    authorId: "cory-house",
    length: "2:30",
    category: "Career"
  },
  {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    watchHref: "http://www.pluralsight.com/pages/web-components-shadow-dom",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5"
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
          page.watchHref = `http://www.pluralsight.com/pages/${page.id}`;
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
