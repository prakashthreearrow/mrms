import { all, takeEvery, put } from "redux-saga/effects";

import { DEPARTMENT_TYPE } from "../../action/types";
import { departmentTypeSuccess, departmentTypeFailure } from "../../action";
import API from "../../../utils/api";

function* departmentTypeRequest() {
  try {
    const res = yield API.get("department-types");
    if (res.data.meta.code === 1) {
      yield put(departmentTypeSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(departmentTypeFailure(res));
    }
  } catch (e) {
    yield put(departmentTypeFailure());
  }
}

export function* watchDepartmentTypeAPI() {
  yield takeEvery(DEPARTMENT_TYPE, departmentTypeRequest);
}

export default function* rootSaga() {
  yield all([watchDepartmentTypeAPI()]);
}
