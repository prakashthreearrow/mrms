import {
  GET_ESCALATION,
  GET_ESCALATION_SUCCESS,
  GET_ESCALATION_FAILURE,
  ADD_EDIT_ESCALATION,
  ADD_EDIT_ESCALATION_SUCCESS,
  ADD_EDIT_ESCALATION_FAILURE,
  DELETE_ESCALATION,
  DELETE_ESCALATION_SUCCESS,
  DELETE_ESCALATION_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  escalationDetail: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ESCALATION:
      return { ...state, loading: true };
    case GET_ESCALATION_SUCCESS:
      return { ...state, loading: false, escalationDetail: action.payload };
    case GET_ESCALATION_FAILURE:
      return { ...state, loading: false, escalationDetail: action.payload };

    case ADD_EDIT_ESCALATION:
      return { ...state, loading: true };
    case ADD_EDIT_ESCALATION_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_ESCALATION_FAILURE:
      return { ...state, loading: false };

    case DELETE_ESCALATION:
      return { ...state, loading: true };
    case DELETE_ESCALATION_SUCCESS:
      return { ...state, loading: false };
    case DELETE_ESCALATION_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
