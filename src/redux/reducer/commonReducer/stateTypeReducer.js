import {
  GET_STATE_TYPES,
  GET_STATE_TYPES_SUCCESS,
  GET_STATE_TYPES_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  stateTypeArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STATE_TYPES:
      return { ...state, loading: true };
    case GET_STATE_TYPES_SUCCESS:
      return { ...state, stateTypeArray: action.payload, loading: false };
    case GET_STATE_TYPES_FAILURE:
      return { ...state, loading: false, stateTypeArray: action.payload };
    default:
      return state;
  }
};
