import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const logs = [
  {
    id: "log1",
    content_type: 'log',
    title: "Log bla 1",
    body: 'Log bla bla'
  },
  {
    id: "log2",
    content_type: 'log',
    title: "Log bla 2",
    body: 'Log bla bla'
  },
  {
    id: "log3",
    content_type: 'log',
    title: "Log bla 3",
    body: 'Log bla bla'
  },
  {
    id: "log4",
    content_type: 'log',
    title: "Log bla 4",
    body: 'Log bla bla'
  },
  {
    id: "log5",
    content_type: 'log',
    title: "Log bla 5",
    body: 'Log bla bla'
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
          log.content_type = 'log';
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
