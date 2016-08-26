import * as types from './actionTypes';
import pageApi from '../api/mockPageApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadPagesSuccess(pages) {
    return {
        type: types.LOAD_PAGES_SUCCESS,
        pages
    };
}

export function createPageSuccess(page) {
    return {
        type: types.CREATE_PAGE_SUCCESS,
        page
    };
}

export function updatePageSuccess(page) {
    return {
        type: types.UPDATE_PAGE_SUCCESS,
        page
    };
}

export function deletePageSuccess(page) {
    return {
        type: types.DELETE_PAGE_SUCCESS,
        page
    };
}

export function loadPages() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return pageApi.getAllPages()
          .then(pages => {
              dispatch(loadPagesSuccess(pages));
          })
          .catch(error => {
              throw(error);
          });
    };
}

export function savePage(page) {
    const p = Object.assign({}, page);
    return dispatch => {
        dispatch(beginAjaxCall());
        return pageApi.savePage(page)
          .then(page => {
              p.id ? dispatch(updatePageSuccess(page)) : dispatch(createPageSuccess(page));
          })
          .catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
    };
}

export function deletePage(page) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return pageApi.deletePage(page)
          .then(() => {
              dispatch(deletePageSuccess(page));
          })
          .catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
    };
}
