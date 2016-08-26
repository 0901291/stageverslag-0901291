import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function logReducer(state = initialState.logs, action) {
    switch (action.type) {
        case types.LOAD_LOGS_SUCCESS:
            return action.logs;
        case types.CREATE_LOG_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.log)
            ];
        case types.UPDATE_LOG_SUCCESS:
            return [
                ...state.filter(log => log.id !== action.log.id),
                Object.assign({}, action.log)
            ];
        default:
            return state;
    }
}