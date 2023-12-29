import {
  DEPARTMENT_TYPE,
  DEPARTMENT_TYPE_SUCCESS,
  DEPARTMENT_TYPE_FAILURE,
} from "../types";

export const departmentType = () => ({
  type: DEPARTMENT_TYPE,
});

export const departmentTypeSuccess = (payload) => ({
  type: DEPARTMENT_TYPE_SUCCESS,
  payload,
});

export const departmentTypeFailure = () => ({
  type: DEPARTMENT_TYPE_FAILURE,
});
