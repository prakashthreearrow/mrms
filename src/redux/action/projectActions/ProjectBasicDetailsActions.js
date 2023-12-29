import {
  GET_PROJECT_BASIC_DETAIL,
  GET_PROJECT_BASIC_DETAIL_SUCCESS,
  GET_PROJECT_BASIC_DETAIL_FAILURE,
  RESET_PROJECT_BASIC_DETAIL,
  ADD_EDIT_PROJECT_BASIC_DETAIL,
  ADD_EDIT_PROJECT_BASIC_DETAIL_SUCCESS,
  ADD_EDIT_PROJECT_BASIC_DETAIL_FAILURE,
} from "../types";

export const getProjectBasicDetail = (payload) => ({
  type: GET_PROJECT_BASIC_DETAIL,
  payload,
});

export const getProjectBasicDetailSuccess = (payload) => ({
  type: GET_PROJECT_BASIC_DETAIL_SUCCESS,
  payload,
});

export const getProjectBasicDetailFailure = (payload) => ({
  type: GET_PROJECT_BASIC_DETAIL_FAILURE,
  payload,
});

export const addEditProjectBasicDetail = (payload) => ({
  type: ADD_EDIT_PROJECT_BASIC_DETAIL,
  payload,
});

export const addEditProjectBasicDetailSuccess = (payload) => ({
  type: ADD_EDIT_PROJECT_BASIC_DETAIL_SUCCESS,
  payload,
});

export const addEditProjectBasicDetailFailure = () => ({
  type: ADD_EDIT_PROJECT_BASIC_DETAIL_FAILURE,
});

export const resetProjectBasicDetail = () => ({
  type: RESET_PROJECT_BASIC_DETAIL,
});
