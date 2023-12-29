import {
  GET_PROJECT_RESOURCE,
  GET_PROJECT_RESOURCE_SUCCESS,
  GET_PROJECT_RESOURCE_FAILURE,
  ADD_EDIT_PROJECT_RESOURCE,
  ADD_EDIT_PROJECT_RESOURCE_SUCCESS,
  ADD_EDIT_PROJECT_RESOURCE_FAILURE,
  DELETE_PROJECT_RESOURCE,
  DELETE_PROJECT_RESOURCE_SUCCESS,
  DELETE_PROJECT_RESOURCE_FAILURE,
  POST_SEND_INTIMATION_TO_TEAM,
  POST_SEND_INTIMATION_TO_TEAM_SUCCESS,
  POST_SEND_INTIMATION_TO_TEAM_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  resourceDetail: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROJECT_RESOURCE:
      return { ...state, loading: true };
    case GET_PROJECT_RESOURCE_SUCCESS:
      return { ...state, loading: false, resourceDetail: action.payload };
    case GET_PROJECT_RESOURCE_FAILURE:
      return { ...state, loading: false, resourceDetail: action.payload };

    case ADD_EDIT_PROJECT_RESOURCE:
      return { ...state, loading: true };
    case ADD_EDIT_PROJECT_RESOURCE_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_PROJECT_RESOURCE_FAILURE:
      return { ...state, loading: false };

    case DELETE_PROJECT_RESOURCE:
      return { ...state, loading: true };
    case DELETE_PROJECT_RESOURCE_SUCCESS:
      return { ...state, loading: false };
    case DELETE_PROJECT_RESOURCE_FAILURE:
      return { ...state, loading: false };

    case POST_SEND_INTIMATION_TO_TEAM:
      return { ...state, loading: true };
    case POST_SEND_INTIMATION_TO_TEAM_SUCCESS:
      return { ...state, loading: false };
    case POST_SEND_INTIMATION_TO_TEAM_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
