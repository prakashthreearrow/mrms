import {
  REPORTING_TO_TYPE,
  REPORTING_TO_TYPE_SUCCESS,
  REPORTING_TO_TYPE_FAILURE,
} from "../types";

export const reportingToType = (payload) => ({
  type: REPORTING_TO_TYPE,
  payload,
});

export const reportingToTypeSuccess = (payload) => ({
  type: REPORTING_TO_TYPE_SUCCESS,
  payload,
});

export const reportingToTypeFailure = () => ({
  type: REPORTING_TO_TYPE_FAILURE,
});
