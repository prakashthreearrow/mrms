import {
  GET_PROJECT_COUNT,
  GET_PROJECT_COUNT_SUCCESS,
  GET_PROJECT_FAILURE,
} from "../types";

export const getProjectCount = (payload) => ({
  type: GET_PROJECT_COUNT,
  payload,
});
export const getProjectCountSuccess = (payload) => ({
  type: GET_PROJECT_COUNT_SUCCESS,
  payload,
});
export const getProjectCountFailure = (payload) => ({
  type: GET_PROJECT_FAILURE,
  payload,
});
