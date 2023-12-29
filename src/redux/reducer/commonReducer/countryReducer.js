import {
  GET_COUNTRY,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  countryArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COUNTRY:
      return { ...state, loading: true };
    case GET_COUNTRY_SUCCESS:
      return { ...state, countryArray: action.payload, loading: false };
    case GET_COUNTRY_FAILURE:
      return { ...state, loading: false, countryArray: action.payload };
    default:
      return state;
  }
};
