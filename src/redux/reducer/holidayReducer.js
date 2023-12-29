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
} from "../action/types";

const INIT_STATE = {
  loading: false,
  data: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_HOLIDAY:
      return { ...state, loading: true };
    case ADD_HOLIDAY_SUCCESS:
      return { ...state, loading: false };
    case ADD_HOLIDAY_FAILURE:
      return { ...state, loading: false };

    case GET_HOLIDAY:
      return { ...state, loading: true };
    case GET_HOLIDAY_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_HOLIDAY_FAILURE:
      return { ...state, loading: false };

    case DELETE_HOLIDAY:
      return { ...state, loading: true };
    case DELETE_HOLIDAY_SUCCESS:
      return { ...state, loading: false };
    case DELETE_HOLIDAY_FAILURE:
      return { ...state, loading: false };

    case UPDATE_HOLIDAY:
      return { ...state, loading: true };
    case UPDATE_HOLIDAY_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_HOLIDAY_FAILURE:
      return { ...state, loading: false };

    case PUBLISH_HOLIDAY:
      return { ...state, loading: true };
    case PUBLISH_HOLIDAY_SUCCESS:
      return { ...state, loading: false };
    case PUBLISH_HOLIDAY_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
