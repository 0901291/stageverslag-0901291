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

const generateId = (log) => {
    return replaceAll(log.title, ' ', '-');
};

class LogApi {
    static getAllLogs() {
        return new Promise((resolve, reject) => {
            resolve(Object.assign([], logs));
        });
    }

    static saveLog(log) {
        return new Promise((resolve, reject) => {
            const minLogTitleLength = 1;
            if (log.title.length < minLogTitleLength) {
                reject(`Title must be at least ${minLogTitleLength} characters.`);
            }

            if (log.id) {
                const existingLogIndex = logs.findIndex(a => a.id == log.id);
                logs.splice(existingLogIndex, 1, log);
            } else {
                log.id           = generateId(log);
                log.content_type = 'log';
                logs.push(log);
            }

            resolve(Object.assign({}, log));
        });
    }

    static deleteLog(logId) {
        return new Promise((resolve, reject) => {
            const indexOfLogToDelete = logs.findIndex(log => {
                log.logId == logId;
            });
            logs.splice(indexOfLogToDelete, 1);
            resolve();
        });
    }
}

export default LogApi;
