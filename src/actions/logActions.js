import * as types from './actionTypes';
import logApi from '../api/mockLogApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadLogsSuccess(logs) {
    return {
        type: types.LOAD_LOGS_SUCCESS,
        logs
    };
}

export function createLogSuccess(log) {
    return {
        type: types.CREATE_LOG_SUCCESS,
        log
    };
}

export function updateLogSuccess(log) {
    return {
        type: types.UPDATE_LOG_SUCCESS,
        log
    };
}

export function loadLogs() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return logApi.getAllLogs()
          .then(logs => {
              dispatch(loadLogsSuccess(logs));
          })
          .catch(error => {
              throw(error);
          });
    };
}

export function saveLog(log) {
    const c = Object.assign({}, log);
    return dispatch => {
        dispatch(beginAjaxCall());
        return logApi.saveLog(log)
          .then(log => {
              c.id ? dispatch(updateLogSuccess(log)) : dispatch(createLogSuccess(log));
          })
          .catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
    };
}