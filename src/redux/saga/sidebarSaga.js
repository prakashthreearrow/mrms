import React from "react";
import { all, takeEvery, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import { GET_SIDEBAR } from "../action/types";
import { getSidebarSuccess, getSidebarFailure } from "../action";
import API from "../../utils/api";
import { ErrorToast } from "../../utils/helper";

function* getSidebarRequest() {
  try {
    const res = yield API.get("/access-list");
    if (res.data.meta.code === 1) {
      yield put(getSidebarSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getSidebarFailure(res));
    }
  } catch (e) {
    yield put(getSidebarFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

export function* watchGetSidebarAPI() {
  yield takeEvery(GET_SIDEBAR, getSidebarRequest);
}

export default function* rootSaga() {
  yield all([watchGetSidebarAPI()]);
}
