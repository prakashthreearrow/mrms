import {
  DESIGNATION_TYPE,
  DESIGNATION_TYPE_SUCCESS,
  DESIGNATION_TYPE_FAILURE,
} from "../types";

export const designationType = () => ({
  type: DESIGNATION_TYPE,
});

export const designationTypeSuccess = (payload) => ({
  type: DESIGNATION_TYPE_SUCCESS,
  payload,
});

export const designationTypeFailure = (payload) => ({
  type: DESIGNATION_TYPE_FAILURE,
  payload,
});
