import {
  DELETE_HOLIDAY_SUCCESS,
  DELETE_PROJECT,
  DELETE_PROJECT_FAILURE,
  GET_PROJECT,
  GET_PROJECT_FAILURE,
  GET_PROJECT_SUCCESS,
} from "../types";

export const getProject = (payload) => ({
  type: GET_PROJECT,
  payload,
});
export const getProjectSuccess = (payload) => ({
  type: GET_PROJECT_SUCCESS,
  payload,
});
export const getProjectFailure = (payload) => ({
  type: GET_PROJECT_FAILURE,
  payload,
});

export const deleteProject = (payload) => ({
  type: DELETE_PROJECT,
  payload,
});
export const deleteProjectSuccess = (payload) => ({
  type: DELETE_HOLIDAY_SUCCESS,
  payload,
});
export const deleteProjectFailure = (payload) => ({
  type: DELETE_PROJECT_FAILURE,
  payload,
});
