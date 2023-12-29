import {
  GET_ESCALATION_TYPE,
  GET_ESCALATION_TYPE_SUCCESS,
  GET_ESCALATION_TYPE_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  escalationArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ESCALATION_TYPE:
      return { ...state, loading: true };
    case GET_ESCALATION_TYPE_SUCCESS:
      return { ...state, loading: false, escalationArray: action.payload };
    case GET_ESCALATION_TYPE_FAILURE:
      return { ...state, loading: false, escalationArray: action.payload };
    default:
      return state;
  }
};
