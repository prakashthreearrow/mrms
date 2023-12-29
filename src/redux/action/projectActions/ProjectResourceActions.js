import {
  GET_PROJECT_RESOURCE,
  GET_PROJECT_RESOURCE_SUCCESS,
  GET_PROJECT_RESOURCE_FAILURE,
  ADD_EDIT_PROJECT_RESOURCE,
  ADD_EDIT_PROJECT_RESOURCE_SUCCESS,
  ADD_EDIT_PROJECT_RESOURCE_FAILURE,
  DELETE_PROJECT_RESOURCE,
  DELETE_PROJECT_RESOURCE_SUCCESS,
  DELETE_PROJECT_RESOURCE_FAILURE,
  POST_SEND_INTIMATION_TO_TEAM,
  POST_SEND_INTIMATION_TO_TEAM_SUCCESS,
  POST_SEND_INTIMATION_TO_TEAM_FAILURE,
} from "../types";

export const getProjectResource = (payload) => ({
  type: GET_PROJECT_RESOURCE,
  payload,
});

export const getProjectResourceSuccess = (payload) => ({
  type: GET_PROJECT_RESOURCE_SUCCESS,
  payload,
});

export const getProjectResourceFailure = (payload) => ({
  type: GET_PROJECT_RESOURCE_FAILURE,
  payload,
});

export const addEditProjectResource = (payload) => ({
  type: ADD_EDIT_PROJECT_RESOURCE,
  payload,
});

export const addEditProjectResourceSuccess = (payload) => ({
  type: ADD_EDIT_PROJECT_RESOURCE_SUCCESS,
  payload,
});

export const addEditProjectResourceFailure = () => ({
  type: ADD_EDIT_PROJECT_RESOURCE_FAILURE,
});

export const deleteProjectResource = (payload) => ({
  type: DELETE_PROJECT_RESOURCE,
  payload,
});

export const deleteProjectResourceSuccess = (payload) => ({
  type: DELETE_PROJECT_RESOURCE_SUCCESS,
  payload,
});

export const deleteProjectResourceFailure = () => ({
  type: DELETE_PROJECT_RESOURCE_FAILURE,
});

export const sendIntimationToTeam = (payload) => ({
  type: POST_SEND_INTIMATION_TO_TEAM,
  payload,
});

export const sendIntimationToTeamSuccess = (payload) => ({
  type: POST_SEND_INTIMATION_TO_TEAM_SUCCESS,
  payload,
});

export const sendIntimationToTeamFailure = () => ({
  type: POST_SEND_INTIMATION_TO_TEAM_FAILURE,
});
