import {
  CREATE_EMPLOYEE_BASIC_INFO,
  CREATE_EMPLOYEE_BASIC_INFO_SUCCESS,
  CREATE_EMPLOYEE_BASIC_INFO_FAILURE,
  NEW_EMPLOYEE_CODE,
  NEW_EMPLOYEE_CODE_SUCCESS,
  NEW_EMPLOYEE_CODE_FAILURE,
  GET_EMPLOYEE_BASIC_INFO,
  GET_EMPLOYEE_BASIC_INFO_SUCCESS,
  GET_EMPLOYEE_BASIC_INFO_FAILURE,
  RESET_EMPLOYEE_BASIC_INFO,
} from "../types";

// Create Employee Action Creator
export const createEmployeeBasicInfo = (payload) => ({
  type: CREATE_EMPLOYEE_BASIC_INFO,
  payload,
});
export const createEmployeeBasicInfoSuccess = (payload) => ({
  type: CREATE_EMPLOYEE_BASIC_INFO_SUCCESS,
  payload,
});
export const createEmployeeBasicInfoFailure = () => ({
  type: CREATE_EMPLOYEE_BASIC_INFO_FAILURE,
});

// Get New Employee Code
export const newEmployeeCode = () => ({
  type: NEW_EMPLOYEE_CODE,
});
export const newEmployeeCodeSuccess = (payload) => ({
  type: NEW_EMPLOYEE_CODE_SUCCESS,
  payload,
});
export const newEmployeeCodeFailure = () => ({
  type: NEW_EMPLOYEE_CODE_FAILURE,
});

//Get Employee basic data
export const getEmployeeBasicInfo = (payload) => ({
  type: GET_EMPLOYEE_BASIC_INFO,
  payload,
});
export const getEmployeeBasicInfoSuccess = (payload) => ({
  type: GET_EMPLOYEE_BASIC_INFO_SUCCESS,
  payload,
});
export const getEmployeeBasicInfoFailure = (payload) => ({
  type: GET_EMPLOYEE_BASIC_INFO_FAILURE,
  payload,
});
export const resetEmployeeBasicInfo = () => ({
  type: RESET_EMPLOYEE_BASIC_INFO,
});
