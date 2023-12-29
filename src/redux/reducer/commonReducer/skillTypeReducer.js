import {
  GET_SKILL_TYPES,
  GET_SKILL_TYPES_SUCCESS,
  GET_SKILL_TYPES_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  skillTypeArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SKILL_TYPES:
      return { ...state, loading: true };
    case GET_SKILL_TYPES_SUCCESS:
      return { ...state, skillTypeArray: action.payload, loading: false };
    case GET_SKILL_TYPES_FAILURE:
      return { ...state, loading: false, skillTypeArray: action.payload };
    default:
      return state;
  }
};
