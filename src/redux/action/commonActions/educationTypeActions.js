import {
  EDUCATION_TYPE,
  EDUCATION_TYPE_FAILURE,
  EDUCATION_TYPE_SUCCESS,
} from "../types";

export const educationType = () => ({
  type: EDUCATION_TYPE,
});

export const educationTypeSuccess = (payload) => ({
  type: EDUCATION_TYPE_SUCCESS,
  payload,
});

export const educationTypeFailure = () => ({
  type: EDUCATION_TYPE_FAILURE,
});
