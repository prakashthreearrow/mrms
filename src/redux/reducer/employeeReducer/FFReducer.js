import {
  ADD_EDIT_FF,
  ADD_EDIT_FF_SUCCESS,
  ADD_EDIT_FF_FAILURE,
  GET_FF,
  GET_FF_SUCCESS,
  GET_FF_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  FFDetail: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_EDIT_FF:
      return { ...state, loading: true };
    case ADD_EDIT_FF_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_FF_FAILURE:
      return { ...state, loading: false };

    case GET_FF:
      return { ...state, loading: true };
    case GET_FF_SUCCESS:
      return { ...state, FFDetail: action.payload, loading: false };
    case GET_FF_FAILURE:
      return { ...state, loading: false, FFDetail: action.payload };
    default:
      return state;
  }
};
