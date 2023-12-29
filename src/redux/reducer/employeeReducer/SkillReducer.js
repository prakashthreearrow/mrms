import {
  ADD_EDIT_USER_SKILL,
  ADD_EDIT_USER_SKILL_SUCCESS,
  ADD_EDIT_USER_SKILL_FAILURE,
  GET_USER_SKILL,
  GET_USER_SKILL_SUCCESS,
  GET_USER_SKILL_FAILURE,
  DELETE_USER_SKILL,
  DELETE_USER_SKILL_SUCCESS,
  DELETE_USER_SKILL_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  userSkillArray: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_EDIT_USER_SKILL:
      return { ...state, loading: true };
    case ADD_EDIT_USER_SKILL_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_USER_SKILL_FAILURE:
      return { ...state, loading: false };
    case DELETE_USER_SKILL:
      return { ...state, loading: true };
    case DELETE_USER_SKILL_SUCCESS:
      return { ...state, loading: false };
    case DELETE_USER_SKILL_FAILURE:
      return { ...state, loading: false };
    case GET_USER_SKILL:
      return { ...state, loading: true };
    case GET_USER_SKILL_SUCCESS:
      return { ...state, userSkillArray: action.payload, loading: false };
    case GET_USER_SKILL_FAILURE:
      return { ...state, userSkillArray: action.payload, loading: false };
    default:
      return state;
  }
};
