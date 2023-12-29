import {
  GET_EMPLOYEE,
  GET_EMPLOYEE_FAILURE,
  GET_EMPLOYEE_SUCCESS,
} from "../types";

export const getEmployee = (payload) => ({
  type: GET_EMPLOYEE,
  payload,
});
export const getEmployeeSuccess = (payload) => ({
  type: GET_EMPLOYEE_SUCCESS,
  payload,
});
export const getEmployeeFailure = (payload) => ({
  type: GET_EMPLOYEE_FAILURE,
  payload,
});
