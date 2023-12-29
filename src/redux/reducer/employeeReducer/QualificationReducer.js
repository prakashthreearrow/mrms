import {
  ADD_EDIT_QUALIFICATION_SUCCESS,
  ADD_EDIT_QUALIFICATION_FAILURE,
  ADD_EDIT_QUALIFICATION,
  GET_QUALIFICATION_SUCCESS,
  GET_QUALIFICATION_FAILURE,
  GET_QUALIFICATION,
  DELETE_QUALIFICATION,
  DELETE_QUALIFICATION_FAILURE,
  DELETE_QUALIFICATION_SUCCESS,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  QualificationArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_EDIT_QUALIFICATION:
      return { ...state, loading: true };
    case ADD_EDIT_QUALIFICATION_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_QUALIFICATION_FAILURE:
      return { ...state, loading: false };

    case GET_QUALIFICATION:
      return { ...state, loading: true };
    case GET_QUALIFICATION_SUCCESS:
      return { ...state, QualificationArray: action.payload, loading: false };
    case GET_QUALIFICATION_FAILURE:
      return { ...state, loading: false, QualificationArray: action.payload };

    case DELETE_QUALIFICATION:
      return { ...state, loading: true };
    case DELETE_QUALIFICATION_SUCCESS:
      return { ...state, loading: false };
    case DELETE_QUALIFICATION_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
