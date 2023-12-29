import React from "react";
import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  GET_CONFIG_DATA,
  GET_CONFIG_EMPLOYEE_DATA,
  UPDATE_CONFIG_EMPLOYEE_DATA,
} from "../../action/types";
import API from "../../../utils/api";
import { ErrorToast } from "../../../utils/helper";
import {
  getConfigDataFailure,
  getConfigDataSuccess,
  getConfigEmployeeDataFailure,
  getConfigEmployeeDataSuccess,
  updateConfigEmployeeDataFailure,
  updateConfigEmployeeDataSuccess,
} from "../../action";

function* getConfigDataRequest(actions) {
  try {
    const res = yield API.get("get-access-master");
    if (res.data.meta.code === 1) {
      yield put(getConfigDataSuccess(res?.data?.data));
      if (actions?.payload?.callback) {
        yield call(actions.payload.callback, res?.data?.data);
      }
    } else if (res.data.meta.code === 0) {
      yield put(getConfigDataFailure(res.data.data));
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getConfigDataFailure(e));
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* getConfigEmployeeDataRequest(actions) {
  try {
    const res = yield API.post("employee-access-list", actions.payload?.form);
    if (res.data.meta.code === 1) {
      yield put(getConfigEmployeeDataSuccess(res?.data?.data));
      if (actions?.payload?.callback) {
        yield call(actions.payload.callback, res?.data);
      }
    } else if (res.data.meta.code === 0) {
      yield put(getConfigEmployeeDataFailure(res.data.data));
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getConfigEmployeeDataFailure(e));
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* updateConfigEmployeeDataRequest(actions) {
  try {
    const res = yield API.post("modify-employee-access", actions.payload.data);
    if (res.data.meta.code === 1) {
      yield put(updateConfigEmployeeDataSuccess(res));
      // res?.data?.data
      if (actions?.payload?.callback) {
        yield call(actions.payload.callback, res?.data?.data);
      }
      // toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(updateConfigEmployeeDataFailure(res));
      // res.data.data
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(updateConfigEmployeeDataFailure(e));
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchGetConfigDataAPI() {
  yield takeEvery(GET_CONFIG_DATA, getConfigDataRequest);
}

export function* watchGetConfigEmployeeDataAPI() {
  yield takeEvery(GET_CONFIG_EMPLOYEE_DATA, getConfigEmployeeDataRequest);
}

export function* watchUpdateConfigEmployeeDataAPI() {
  yield takeEvery(UPDATE_CONFIG_EMPLOYEE_DATA, updateConfigEmployeeDataRequest);
}

export default function* rootSaga() {
  yield all([
    watchGetConfigDataAPI(),
    watchGetConfigEmployeeDataAPI(),
    watchUpdateConfigEmployeeDataAPI(),
  ]);
}
