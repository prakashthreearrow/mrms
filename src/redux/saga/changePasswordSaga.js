import React from "react";
import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import { CHANGE_PASSWORD } from "../action/types";
import { changePasswordSuccess, changePasswordFailure } from "../action";
import API from "../../utils/api";
import { ErrorToast, SuccessToast } from "../../utils/helper";

function* changePasswordRequest(actions) {
  try {
    const res = yield API.post("change-password", actions.payload.form);
    if (res.data.meta.code === 1) {
      yield put(changePasswordSuccess());
      yield call(actions.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(changePasswordFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(changePasswordFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchChangePasswordAPI() {
  yield takeEvery(CHANGE_PASSWORD, changePasswordRequest);
}

export default function* rootSaga() {
  yield all([watchChangePasswordAPI()]);
}
