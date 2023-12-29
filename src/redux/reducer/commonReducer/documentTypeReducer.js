import {
  GET_DOCUMENT_TYPES,
  GET_DOCUMENT_TYPES_SUCCESS,
  GET_DOCUMENT_TYPES_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  docTypeArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DOCUMENT_TYPES:
      return { ...state, loading: true };
    case GET_DOCUMENT_TYPES_SUCCESS:
      return { ...state, docTypeArray: action.payload, loading: false };
    case GET_DOCUMENT_TYPES_FAILURE:
      return { ...state, loading: false, docTypeArray: action.payload };
    default:
      return state;
  }
};
