import {
  GET_PLATFORM_TYPES,
  GET_PLATFORM_TYPES_SUCCESS,
  GET_PLATFORM_TYPES_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  platformArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PLATFORM_TYPES:
      return { ...state, loading: true };
    case GET_PLATFORM_TYPES_SUCCESS:
      return { ...state, platformArray: action.payload, loading: false };
    case GET_PLATFORM_TYPES_FAILURE:
      return { ...state, loading: false, platformArray: action.payload };
    default:
      return state;
  }
};
