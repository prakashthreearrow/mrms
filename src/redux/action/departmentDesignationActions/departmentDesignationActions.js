// eslint-disable-next-line no-unused-vars
import {
  ADD_EDIT_DEPARTMENT,
  ADD_EDIT_DEPARTMENT_SUCCESS,
  ADD_EDIT_DEPARTMENT_FAILURE,
  ADD_EDIT_DESIGNATION,
  ADD_EDIT_DESIGNATION_SUCCESS,
  ADD_EDIT_DESIGNATION_FAILURE,
  GET_DESIGNATION_FILTER,
  GET_DESIGNATION_FILTER_FAILURE,
  GET_DESIGNATION_FILTER_SUCCESS,
} from "../types";

export const addEditDepartment = (payload) => ({
  type: ADD_EDIT_DEPARTMENT,
  payload,
});

export const addEditDepartmentSuccess = (payload) => ({
  type: ADD_EDIT_DEPARTMENT_SUCCESS,
  payload,
});

export const addEditDepartmentFailure = () => ({
  type: ADD_EDIT_DEPARTMENT_FAILURE,
});

export const addEditDesignation = (payload) => ({
  type: ADD_EDIT_DESIGNATION,
  payload,
});

export const addEditDesignationSuccess = (payload) => ({
  type: ADD_EDIT_DESIGNATION_SUCCESS,
  payload,
});

export const addEditDesignationFailure = () => ({
  type: ADD_EDIT_DESIGNATION_FAILURE,
});

export const getDesignationFilter = (payload) => ({
  type: GET_DESIGNATION_FILTER,
  payload,
});

export const getDesignationFilterSuccess = (payload) => ({
  type: GET_DESIGNATION_FILTER_SUCCESS,
  payload,
});

export const getDesignationFilterFailure = (payload) => ({
  type: GET_DESIGNATION_FILTER_FAILURE,
  payload,
});
