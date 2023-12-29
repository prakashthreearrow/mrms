import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import React from "react";

import {
  CREATE_EMPLOYEE_BASIC_INFO,
  NEW_EMPLOYEE_CODE,
  GET_EMPLOYEE_BASIC_INFO,
} from "../../action/types";
import {
  createEmployeeBasicInfoSuccess,
  createEmployeeBasicInfoFailure,
  newEmployeeCodeSuccess,
  newEmployeeCodeFailure,
  getEmployeeBasicInfoSuccess,
  getEmployeeBasicInfoFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* createEmployeeBasicInfoRequest(action) {
  try {
    const res = yield API.post(
      "admin/basic-info-add-edit",
      action.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(createEmployeeBasicInfoSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(createEmployeeBasicInfoFailure(res));
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(createEmployeeBasicInfoFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* newEmployeeCodeRequest() {
  try {
    const res = yield API.get("generate-employee-code");
    if (res.data.meta.code === 1) {
      yield put(newEmployeeCodeSuccess(res?.data?.data?.employee_code));
    } else if (res.data.meta.code === 0) {
      yield put(newEmployeeCodeFailure(res));
    }
  } catch (e) {
    yield put(newEmployeeCodeFailure());
  }
}

function* getEmployeeBasicInfoRequest(action) {
  try {
    const res = yield API.get(`/get-employee?id=${action.payload.id}`);
    if (res.data.meta.code === 1) {
      yield put(getEmployeeBasicInfoSuccess(res?.data?.data?.employee));
    } else if (res.data.meta.code === 0) {
      yield put(getEmployeeBasicInfoFailure(res));
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getEmployeeBasicInfoFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchCreateEmployeeBasicInfoAPI() {
  yield takeEvery(CREATE_EMPLOYEE_BASIC_INFO, createEmployeeBasicInfoRequest);
}

export function* watchNewEmployeeCodeAPI() {
  yield takeEvery(NEW_EMPLOYEE_CODE, newEmployeeCodeRequest);
}

export function* watchGetEmployeeBasicInfoAPI() {
  yield takeEvery(GET_EMPLOYEE_BASIC_INFO, getEmployeeBasicInfoRequest);
}

export default function* rootSaga() {
  yield all([
    watchCreateEmployeeBasicInfoAPI(),
    watchNewEmployeeCodeAPI(),
    watchGetEmployeeBasicInfoAPI(),
  ]);
}
