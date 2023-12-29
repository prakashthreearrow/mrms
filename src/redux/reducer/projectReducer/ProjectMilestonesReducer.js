import {
  GET_PROJECT_MILESTONE,
  GET_PROJECT_MILESTONE_SUCCESS,
  GET_PROJECT_MILESTONE_FAILURE,
  ADD_EDIT_PROJECT_MILESTONE,
  ADD_EDIT_PROJECT_MILESTONE_SUCCESS,
  ADD_EDIT_PROJECT_MILESTONE_FAILURE,
  DELETE_PROJECT_MILESTONE,
  DELETE_PROJECT_MILESTONE_SUCCESS,
  DELETE_PROJECT_MILESTONE_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  projectMilestone: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROJECT_MILESTONE:
      return { ...state, loading: true };
    case GET_PROJECT_MILESTONE_SUCCESS:
      return { ...state, projectMilestone: action.payload, loading: false };
    case GET_PROJECT_MILESTONE_FAILURE:
      return { ...state, projectMilestone: action.payload, loading: false };

    case ADD_EDIT_PROJECT_MILESTONE:
      return { ...state, loading: true };
    case ADD_EDIT_PROJECT_MILESTONE_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_PROJECT_MILESTONE_FAILURE:
      return { ...state, loading: false };

    case DELETE_PROJECT_MILESTONE:
      return { ...state, loading: true };
    case DELETE_PROJECT_MILESTONE_SUCCESS:
      return { ...state, loading: false };
    case DELETE_PROJECT_MILESTONE_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
