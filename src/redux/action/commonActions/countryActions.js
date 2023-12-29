import {
  GET_COUNTRY,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
} from "../types";

export const countryType = () => ({
  type: GET_COUNTRY,
});

export const countrySuccess = (payload) => ({
  type: GET_COUNTRY_SUCCESS,
  payload,
});

export const countryFailure = () => ({
  type: GET_COUNTRY_FAILURE,
});
