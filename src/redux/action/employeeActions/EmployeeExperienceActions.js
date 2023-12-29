import {
  GET_EMPLOYEE_EXPERIENCE,
  GET_EMPLOYEE_EXPERIENCE_FAILURE,
  GET_EMPLOYEE_EXPERIENCE_SUCCESS,
  ADD_EDIT_EMPLOYEE_EXPERIENCE,
  ADD_EDIT_EMPLOYEE_EXPERIENCE_FAILURE,
  ADD_EDIT_EMPLOYEE_EXPERIENCE_SUCCESS,
  DELETE_EMPLOYEE_EXPERIENCE,
  DELETE_EMPLOYEE_EXPERIENCE_SUCCESS,
  DELETE_EMPLOYEE_EXPERIENCE_FAILURE,
} from "../types";

// Create Employee Action Creator
export const getEmployeeExperience = (payload) => ({
  type: GET_EMPLOYEE_EXPERIENCE,
  payload,
});
export const getEmployeeExperienceSuccess = (payload) => ({
  type: GET_EMPLOYEE_EXPERIENCE_SUCCESS,
  payload,
});
export const getEmployeeExperienceFailure = (payload) => ({
  type: GET_EMPLOYEE_EXPERIENCE_FAILURE,
  payload,
});

export const addEditEmployeeExperience = (payload) => ({
  type: ADD_EDIT_EMPLOYEE_EXPERIENCE,
  payload,
});
export const addEditEmployeeExperienceSuccess = (payload) => ({
  type: ADD_EDIT_EMPLOYEE_EXPERIENCE_SUCCESS,
  payload,
});
export const addEditEmployeeExperienceFailure = () => ({
  type: ADD_EDIT_EMPLOYEE_EXPERIENCE_FAILURE,
});

export const deleteEmployeeExperience = (payload) => ({
  type: DELETE_EMPLOYEE_EXPERIENCE,
  payload,
});
export const deleteEmployeeExperienceSuccess = () => ({
  type: DELETE_EMPLOYEE_EXPERIENCE_SUCCESS,
});
export const deleteEmployeeExperienceFailure = () => ({
  type: DELETE_EMPLOYEE_EXPERIENCE_FAILURE,
});
