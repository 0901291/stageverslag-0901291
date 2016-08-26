import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function achievementReducer(state = initialState.achievements, action) {
    switch (action.type) {
        case types.LOAD_ACHIEVEMENTS_SUCCESS:
            return action.achievements;
        case types.CREATE_ACHIEVEMENT_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.achievement)
            ];
        case types.UPDATE_ACHIEVEMENT_SUCCESS:
            return [
                ...state.filter(achievement => achievement.id !== action.achievement.id),
                Object.assign({}, action.achievement)
            ];
        default:
            return state;
    }
}