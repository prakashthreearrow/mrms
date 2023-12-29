import {
  GET_CONFIG_DATA,
  GET_CONFIG_DATA_SUCCESS,
  GET_CONFIG_DATA_FAILURE,
  GET_CONFIG_EMPLOYEE_DATA,
  GET_CONFIG_EMPLOYEE_DATA_SUCCESS,
  GET_CONFIG_EMPLOYEE_DATA_FAILURE,
  UPDATE_CONFIG_EMPLOYEE_DATA,
  UPDATE_CONFIG_EMPLOYEE_DATA_SUCCESS,
  UPDATE_CONFIG_EMPLOYEE_DATA_FAILURE,
} from "../types";

export const getConfigData = (payload) => ({
  type: GET_CONFIG_DATA,
  payload,
});

export const getConfigDataSuccess = (payload) => ({
  type: GET_CONFIG_DATA_SUCCESS,
  payload,
});

export const getConfigDataFailure = (payload) => ({
  type: GET_CONFIG_DATA_FAILURE,
  payload,
});

export const getConfigEmployeeData = (payload) => ({
  type: GET_CONFIG_EMPLOYEE_DATA,
  payload,
});

export const getConfigEmployeeDataSuccess = (payload) => ({
  type: GET_CONFIG_EMPLOYEE_DATA_SUCCESS,
  payload,
});

export const getConfigEmployeeDataFailure = (payload) => ({
  type: GET_CONFIG_EMPLOYEE_DATA_FAILURE,
  payload,
});

export const updateConfigEmployeeData = (payload) => ({
  type: UPDATE_CONFIG_EMPLOYEE_DATA,
  payload,
});

export const updateConfigEmployeeDataSuccess = (payload) => ({
  type: UPDATE_CONFIG_EMPLOYEE_DATA_SUCCESS,
  payload,
});

export const updateConfigEmployeeDataFailure = (payload) => ({
  type: UPDATE_CONFIG_EMPLOYEE_DATA_FAILURE,
  payload,
});
