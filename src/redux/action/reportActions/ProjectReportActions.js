import {
  GET_PROJECT_REPORT,
  GET_PROJECT_REPORT_SUCCESS,
  GET_PROJECT_REPORT_FAILURE,
} from "../types";

export const getProjectReport = (payload) => ({
  type: GET_PROJECT_REPORT,
  payload,
});

export const getProjectReportSuccess = (payload) => ({
  type: GET_PROJECT_REPORT_SUCCESS,
  payload,
});

export const getProjectReportFailure = (payload) => ({
  type: GET_PROJECT_REPORT_FAILURE,
  payload,
});
