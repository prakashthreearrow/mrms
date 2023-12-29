import {
  GET_PROJECT_CHANGE_REQUEST,
  GET_PROJECT_CHANGE_REQUEST_SUCCESS,
  GET_PROJECT_CHANGE_REQUEST_FAILURE,
  ADD_EDIT_PROJECT_CHANGE_REQUEST,
  ADD_EDIT_PROJECT_CHANGE_REQUEST_SUCCESS,
  ADD_EDIT_PROJECT_CHANGE_REQUEST_FAILURE,
  DELETE_PROJECT_CHANGE_REQUEST,
  DELETE_PROJECT_CHANGE_REQUEST_SUCCESS,
  DELETE_PROJECT_CHANGE_REQUEST_FAILURE,
} from "../types";

export const getProjectChangeRequest = (payload) => ({
  type: GET_PROJECT_CHANGE_REQUEST,
  payload,
});

export const getProjectChangeRequestSuccess = (payload) => ({
  type: GET_PROJECT_CHANGE_REQUEST_SUCCESS,
  payload,
});

export const getProjectChangeRequestFailure = (payload) => ({
  type: GET_PROJECT_CHANGE_REQUEST_FAILURE,
  payload,
});

export const addEditProjectChangeRequest = (payload) => ({
  type: ADD_EDIT_PROJECT_CHANGE_REQUEST,
  payload,
});

export const addEditProjectChangeRequestSuccess = (payload) => ({
  type: ADD_EDIT_PROJECT_CHANGE_REQUEST_SUCCESS,
  payload,
});

export const addEditProjectChangeRequestFailure = () => ({
  type: ADD_EDIT_PROJECT_CHANGE_REQUEST_FAILURE,
});

export const deleteProjectChangeRequest = (payload) => ({
  type: DELETE_PROJECT_CHANGE_REQUEST,
  payload,
});

export const deleteProjectChangeRequestSuccess = (payload) => ({
  type: DELETE_PROJECT_CHANGE_REQUEST_SUCCESS,
  payload,
});

export const deleteProjectChangeRequestFailure = (payload) => ({
  type: DELETE_PROJECT_CHANGE_REQUEST_FAILURE,
  payload,
});
