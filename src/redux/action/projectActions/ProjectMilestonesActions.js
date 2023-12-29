import {
  GET_PROJECT_MILESTONE,
  GET_PROJECT_MILESTONE_SUCCESS,
  GET_PROJECT_MILESTONE_FAILURE,
  ADD_EDIT_PROJECT_MILESTONE,
  ADD_EDIT_PROJECT_MILESTONE_SUCCESS,
  ADD_EDIT_PROJECT_MILESTONE_FAILURE,
  DELETE_PROJECT_MILESTONE,
  DELETE_PROJECT_MILESTONE_SUCCESS,
  DELETE_PROJECT_MILESTONE_FAILURE,
} from "../types";

export const getProjectMilestone = (payload) => ({
  type: GET_PROJECT_MILESTONE,
  payload,
});
export const getProjectMilestonesSuccess = (payload) => ({
  type: GET_PROJECT_MILESTONE_SUCCESS,
  payload,
});
export const getProjectMilestonesFailure = (payload) => ({
  type: GET_PROJECT_MILESTONE_FAILURE,
  payload,
});

export const addEditProjectMilestone = (payload) => ({
  type: ADD_EDIT_PROJECT_MILESTONE,
  payload,
});
export const addEditProjectMilestonesSuccess = (payload) => ({
  type: ADD_EDIT_PROJECT_MILESTONE_SUCCESS,
  payload,
});
export const addEditProjectMilestonesFailure = () => ({
  type: ADD_EDIT_PROJECT_MILESTONE_FAILURE,
});

export const deleteProjectMilestone = (payload) => ({
  type: DELETE_PROJECT_MILESTONE,
  payload,
});
export const deleteProjectMilestoneSuccess = (payload) => ({
  type: DELETE_PROJECT_MILESTONE_SUCCESS,
  payload,
});
export const deleteProjectMilestoneFailure = () => ({
  type: DELETE_PROJECT_MILESTONE_FAILURE,
});
