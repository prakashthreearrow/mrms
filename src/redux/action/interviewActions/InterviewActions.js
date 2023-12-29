import {
  ADD_INTERVIEW,
  ADD_INTERVIEW_SUCCESS,
  ADD_INTERVIEW_FAILURE,
  GET_INTERVIEW_DATA,
  GET_INTERVIEW_DATA_SUCCESS,
  GET_INTERVIEW_DATA_FAILURE,
  POST_SEND_INTIMATION,
  POST_SEND_INTIMATION_FAILURE,
  POST_SEND_INTIMATION_SUCCESS,
} from "../types";

export const addInterview = (payload) => ({
  type: ADD_INTERVIEW,
  payload,
});

export const addInterviewSuccess = (payload) => ({
  type: ADD_INTERVIEW_SUCCESS,
  payload,
});

export const addInterviewFailure = () => ({
  type: ADD_INTERVIEW_FAILURE,
});

//GET INTERVIEW DATA ACTIONS

export const getInterviewData = (payload) => ({
  type: GET_INTERVIEW_DATA,
  payload,
});
export const getInterviewDataSuccess = (payload) => ({
  type: GET_INTERVIEW_DATA_SUCCESS,
  payload,
});
export const getInterviewDataFailure = (payload) => ({
  type: GET_INTERVIEW_DATA_FAILURE,
  payload,
});

export const sendIntimationEmail = (payload) => ({
  type: POST_SEND_INTIMATION,
  payload,
});

export const sendIntimationEmailSuccess = (payload) => ({
  type: POST_SEND_INTIMATION_SUCCESS,
  payload,
});

export const sendIntimationEmailFailure = () => ({
  type: POST_SEND_INTIMATION_FAILURE,
});
