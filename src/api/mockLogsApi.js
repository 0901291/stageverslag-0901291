import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const logs = [
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref: "http://www.pluralsight.com/logs/react-flux-building-applications",
    authorId: "cory-house",
    length: "5:08",
    category: "JavaScript"
  },
  {
    id: "clean-code",
    title: "Clean Code: Writing Code for Humans",
    watchHref: "http://www.pluralsight.com/logs/writing-clean-code-humans",
    authorId: "cory-house",
    length: "3:10",
    category: "Software Practices"
  },
  {
    id: "architecture",
    title: "Architecting Applications for the Real World",
    watchHref: "http://www.pluralsight.com/logs/architecting-applications-dotnet",
    authorId: "cory-house",
    length: "2:52",
    category: "Software Architecture"
  },
  {
    id: "career-reboot-for-developer-mind",
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    watchHref: "http://www.pluralsight.com/logs/career-reboot-for-developer-mind",
    authorId: "cory-house",
    length: "2:30",
    category: "Career"
  },
  {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    watchHref: "http://www.pluralsight.com/logs/web-components-shadow-dom",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (log) => {
  return replaceAll(log.title, ' ', '-');
};

class LogApi {
  static getAllLogs() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], logs));
      }, delay);
    });
  }

  static saveLog(log) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minLogTitleLength = 1;
        if (log.title.length < minLogTitleLength) {
          reject(`Title must be at least ${minLogTitleLength} characters.`);
        }

        if (log.id) {
          const existingLogIndex = logs.findIndex(a => a.id == log.id);
          logs.splice(existingLogIndex, 1, log);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new logs in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          log.id = generateId(log);
          log.watchHref = `http://www.pluralsight.com/logs/${log.id}`;
          logs.push(log);
        }

        resolve(Object.assign({}, log));
      }, delay);
    });
  }

  static deleteLog(logId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfLogToDelete = logs.findIndex(log => {
          log.logId == logId;
        });
        logs.splice(indexOfLogToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default LogApi;
