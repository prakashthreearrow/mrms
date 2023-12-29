import {
  GET_CONFIG_DESIGNATION_DATA,
  GET_CONFIG_DESIGNATION_DATA_SUCCESS,
  GET_CONFIG_DESIGNATION_DATA_FAILURE,
  UPDATE_CONFIG_DESIGNATION_DATA,
  UPDATE_CONFIG_DESIGNATION_DATA_SUCCESS,
  UPDATE_CONFIG_DESIGNATION_DATA_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  loadingConfigDesg: false,
  configDesignationData: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CONFIG_DESIGNATION_DATA:
      return { ...state, loading: true };
    case GET_CONFIG_DESIGNATION_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        configDesignationData: action.payload,
      };
    case GET_CONFIG_DESIGNATION_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        configDesignationData: action.payload,
      };

    case UPDATE_CONFIG_DESIGNATION_DATA:
      return { ...state, loadingConfigDesg: true };
    case UPDATE_CONFIG_DESIGNATION_DATA_SUCCESS:
      var tmp = state.configDesignationData.map((object) => ({ ...object }));
      if (action?.payload?.data?.data?.status == "1") {
        tmp.map((dataa) => {
          dataa.data.map((subData) => {
            if (
              subData.designation_id ==
              action.payload?.data?.data?.designation_id
            ) {
              if (
                !subData.access_ids.includes(
                  action?.payload?.data?.data?.access_id
                )
              ) {
                subData.access_ids.push(
                  parseInt(action?.payload?.data?.data?.access_id)
                );
              }
            }
          });
        });
      } else {
        tmp.map((dataa) => {
          dataa.data.map((subData) => {
            if (
              subData.designation_id ==
              action.payload?.data?.data?.designation_id
            ) {
              const index = subData.access_ids.indexOf(
                action.payload?.data?.data?.access_id
              );
              if (index > -1) {
                subData.access_ids.splice(index, 1);
              }
            }
          });
        });
      }
      state.configDesignationData = tmp;
      return { ...state, loadingConfigDesg: false };
    case UPDATE_CONFIG_DESIGNATION_DATA_FAILURE:
      return { ...state, loadingConfigDesg: false };

    default:
      return state;
  }
};
