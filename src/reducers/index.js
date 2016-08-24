import {combineReducers} from 'redux';
import achievements from './achievementReducer';
import pages from './pageReducer';
import logs from './logReducer';
import numAjaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    achievements,
    pages,
    logs,
    numAjaxCallsInProgress
});

export default rootReducer;