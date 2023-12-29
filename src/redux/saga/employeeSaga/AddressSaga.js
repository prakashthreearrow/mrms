import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import React from "react";

import { ADD_EDIT_ADDRESS, GET_ADDRESS } from "../../action/types";
import {
  getAddressSuccess,
  getAddressFailure,
  addEditAddressSuccess,
  addEditAddressFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* addEditAddressRequest(action) {
  try {
    const res = yield API.post("admin/address-add-edit", action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(addEditAddressSuccess(res?.data?.data));
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditAddressFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditAddressFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* getAddressRequest(action) {
  try {
    const res = yield API.get(`get-employee-address?id=${action.payload}`);
    if (res.data.meta.code === 1) {
      yield put(getAddressSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getAddressFailure(res.data.data));
    }
  } catch (e) {
    yield put(getAddressFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

export function* watchAddEditAddressAPI() {
  yield takeEvery(ADD_EDIT_ADDRESS, addEditAddressRequest);
}

export function* watchGetAddressAPI() {
  yield takeEvery(GET_ADDRESS, getAddressRequest);
}

export default function* rootSaga() {
  yield all([watchGetAddressAPI(), watchAddEditAddressAPI()]);
}
