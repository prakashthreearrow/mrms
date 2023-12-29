import React from "react";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

import API from "../../../utils/api";
import { ErrorToast } from "../../../utils/helper";
import { GET_EMPLOYEE } from "../../action/types";
import { getEmployeeFailure, getEmployeeSuccess } from "../../action";

/*Get Employee*/
function* getEmployeeRequest(actions) {
  try {
    const res = yield API.post("employee-list-filter", actions.payload.form);
    if (res.data.meta.code === 1) {
      yield put(yield put(getEmployeeSuccess(res?.data)));
      yield call(actions.payload.callback);
    } else if (res.data.meta.code === 0) {
      yield put(getEmployeeFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getEmployeeFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchGetEmployeeAPI() {
  yield takeEvery(GET_EMPLOYEE, getEmployeeRequest);
}

export default function* rootSaga() {
  yield all([watchGetEmployeeAPI()]);
}
