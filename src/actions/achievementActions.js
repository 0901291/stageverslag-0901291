import * as types from './actionTypes';
import achievementApi from '../api/mockAchievementApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadAchievementsSuccess(achievements) {
    return {
        type: types.LOAD_ACHIEVEMENTS_SUCCESS,
        achievements
    };
}

export function createAchievementSuccess(achievement) {
    return {
        type: types.CREATE_ACHIEVEMENT_SUCCESS,
        achievement
    };
}

export function updateAchievementSuccess(achievement) {
    return {
        type: types.UPDATE_ACHIEVEMENT_SUCCESS,
        achievement
    };
}

export function loadAchievements() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return achievementApi.getAllAchievements()
          .then(achievements => {
              dispatch(loadAchievementsSuccess(achievements));
          })
          .catch(error => {
              throw(error);
          });
    };
}

export function saveAchievement(achievement) {
    const c = Object.assign({}, achievement);
    return dispatch => {
        dispatch(beginAjaxCall());
        return achievementApi.saveAchievement(achievement)
          .then(achievement => {
              c.id ? dispatch(updateAchievementSuccess(achievement)) : dispatch(createAchievementSuccess(achievement));
          })
          .catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
    };
}