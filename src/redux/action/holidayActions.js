import {
  ADD_HOLIDAY,
  ADD_HOLIDAY_FAILURE,
  ADD_HOLIDAY_SUCCESS,
  DELETE_HOLIDAY,
  DELETE_HOLIDAY_FAILURE,
  DELETE_HOLIDAY_SUCCESS,
  GET_HOLIDAY,
  GET_HOLIDAY_FAILURE,
  GET_HOLIDAY_SUCCESS,
  PUBLISH_HOLIDAY,
  PUBLISH_HOLIDAY_FAILURE,
  PUBLISH_HOLIDAY_SUCCESS,
  UPDATE_HOLIDAY,
  UPDATE_HOLIDAY_FAILURE,
  UPDATE_HOLIDAY_SUCCESS,
} from "./types";

export const addHoliday = (payload) => ({
  type: ADD_HOLIDAY,
  payload,
});
export const addHolidaySuccess = (payload) => ({
  type: ADD_HOLIDAY_SUCCESS,
  payload,
});
export const addHolidayFailure = (payload) => ({
  type: ADD_HOLIDAY_FAILURE,
  payload,
});

export const getHoliday = (payload) => ({
  type: GET_HOLIDAY,
  payload,
});
export const getHolidaySuccess = (payload) => ({
  type: GET_HOLIDAY_SUCCESS,
  payload,
});
export const getHolidayFailure = (payload) => ({
  type: GET_HOLIDAY_FAILURE,
  payload,
});

export const deleteHoliday = (payload) => ({
  type: DELETE_HOLIDAY,
  payload,
});
export const deleteHolidaySuccess = (payload) => ({
  type: DELETE_HOLIDAY_SUCCESS,
  payload,
});
export const deleteHolidayFailure = (payload) => ({
  type: DELETE_HOLIDAY_FAILURE,
  payload,
});

export const updateHoliday = (payload) => ({
  type: UPDATE_HOLIDAY,
  payload,
});
export const updateHolidaySuccess = (payload) => ({
  type: UPDATE_HOLIDAY_SUCCESS,
  payload,
});
export const updateHolidayFailure = (payload) => ({
  type: UPDATE_HOLIDAY_FAILURE,
  payload,
});

export const publishHoliday = (payload) => ({
  type: PUBLISH_HOLIDAY,
  payload,
});
export const publishHolidaySuccess = (payload) => ({
  type: PUBLISH_HOLIDAY_SUCCESS,
  payload,
});
export const publishHolidayFailure = (payload) => ({
  type: PUBLISH_HOLIDAY_FAILURE,
  payload,
});
