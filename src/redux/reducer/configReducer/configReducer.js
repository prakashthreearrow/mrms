import {
  GET_CONFIG_DATA,
  GET_CONFIG_DATA_FAILURE,
  GET_CONFIG_DATA_SUCCESS,
  GET_CONFIG_EMPLOYEE_DATA,
  GET_CONFIG_EMPLOYEE_DATA_FAILURE,
  GET_CONFIG_EMPLOYEE_DATA_SUCCESS,
  UPDATE_CONFIG_EMPLOYEE_DATA,
  UPDATE_CONFIG_EMPLOYEE_DATA_FAILURE,
  UPDATE_CONFIG_EMPLOYEE_DATA_SUCCESS,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  loadingConfigEmp: false,
  configColumnData: null,
  configEmployeeData: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CONFIG_DATA:
      return { ...state, loading: true };
    case GET_CONFIG_DATA_SUCCESS:
      return { ...state, loading: false, configColumnData: action.payload };
    case GET_CONFIG_DATA_FAILURE:
      return { ...state, loading: false, configColumnData: action.payload };

    case GET_CONFIG_EMPLOYEE_DATA:
      return { ...state, loading: true };
    case GET_CONFIG_EMPLOYEE_DATA_SUCCESS:
      return { ...state, loading: false, configEmployeeData: action.payload };
    case GET_CONFIG_EMPLOYEE_DATA_FAILURE:
      return { ...state, loading: false, configEmployeeData: action.payload };

    case UPDATE_CONFIG_EMPLOYEE_DATA:
      return { ...state, loadingConfigEmp: true };
    case UPDATE_CONFIG_EMPLOYEE_DATA_SUCCESS:
      var tmp = state.configEmployeeData.map((object) => ({ ...object }));
      if (action?.payload?.data?.data?.status == "1") {
        tmp.map((data) => {
          if (data.id === action.payload?.data?.data?.employee_id) {
            if (
              !data.access_employee.includes(
                action.payload?.data?.data?.access_id
              )
            ) {
              data.access_employee.push(
                parseInt(action.payload?.data?.data?.access_id)
              );
            }
          }
        });
      } else {
        tmp.map((data) => {
          if (data.id === action.payload?.data?.data?.employee_id) {
            data.access_employee.map((d) => {
              //console.log(d, action.payload?.data?.data?.access_id);
              if (d == action.payload?.data?.data?.access_id) {
                const index = data.access_employee.indexOf(d);
                if (index > -1) {
                  data.access_employee.splice(index, 1);
                }
              }
            });
          }
        });
      }
      state.configEmployeeData = tmp;
      return { ...state, loadingConfigEmp: false };
    case UPDATE_CONFIG_EMPLOYEE_DATA_FAILURE:
      return { ...state, loadingConfigEmp: false };

    default:
      return state;
  }
};
