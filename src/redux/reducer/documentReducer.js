import {
  ADD_EDIT_COMPANY_DOCUMENT,
  ADD_EDIT_COMPANY_DOCUMENT_SUCCESS,
  ADD_EDIT_COMPANY_DOCUMENT_FAILURE,
  PUBLISH_COMPANY_DOCUMENT,
  PUBLISH_COMPANY_DOCUMENT_SUCCESS,
  PUBLISH_COMPANY_DOCUMENT_FAILURE,
  TOGGLE_COMPANY_DOCUMENT,
  TOGGLE_COMPANY_DOCUMENT_SUCCESS,
  TOGGLE_COMPANY_DOCUMENT_FAILURE,
  GET_COMPANY_DOCUMENT,
  GET_COMPANY_DOCUMENT_SUCCESS,
  GET_COMPANY_DOCUMENT_FAILURE,
  DELETE_COMPANY_DOCUMENT,
  DELETE_COMPANY_DOCUMENT_SUCCESS,
  DELETE_COMPANY_DOCUMENT_FAILURE,
} from "../action/types";

const INIT_STATE = {
  loading: false,
  CompanyDocumentDetail: null,
  data: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_EDIT_COMPANY_DOCUMENT:
      return { ...state, loading: true };
    case ADD_EDIT_COMPANY_DOCUMENT_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_COMPANY_DOCUMENT_FAILURE:
      return { ...state, loading: false };

    case PUBLISH_COMPANY_DOCUMENT:
      return { ...state, loading: true };
    case PUBLISH_COMPANY_DOCUMENT_SUCCESS:
      return { ...state, loading: false };
    case PUBLISH_COMPANY_DOCUMENT_FAILURE:
      return { ...state, loading: false };

    case TOGGLE_COMPANY_DOCUMENT:
      return { ...state, loading: true };
    case TOGGLE_COMPANY_DOCUMENT_SUCCESS:
      return { ...state, loading: false };
    case TOGGLE_COMPANY_DOCUMENT_FAILURE:
      return { ...state, loading: false };

    case GET_COMPANY_DOCUMENT:
      return { ...state, loading: true };
    case GET_COMPANY_DOCUMENT_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case GET_COMPANY_DOCUMENT_FAILURE:
      return { ...state, loading: false };

    case DELETE_COMPANY_DOCUMENT:
      return { ...state, loading: true };
    case DELETE_COMPANY_DOCUMENT_SUCCESS:
      return { ...state, loading: false };
    case DELETE_COMPANY_DOCUMENT_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
