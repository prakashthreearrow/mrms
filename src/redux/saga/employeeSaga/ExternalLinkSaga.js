import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  ADD_EDIT_EXTERNAL_LINK_USER,
  GET_USER_EXTERNAL_LINK,
} from "../../action/types";
import {
  addEditExternalLinkUserSuccess,
  addEditExternalLinkUserFailure,
  getUserExternalLinkSuccess,
  getUserExternalLinkFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";
import React from "react";

function* addEditExternalLinkUserRequest(action) {
  try {
    const res = yield API.post("/admin/ext-link-add-edit", action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(addEditExternalLinkUserSuccess());
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditExternalLinkUserFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditExternalLinkUserFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* getUserExternalLinkRequest(action) {
  try {
    const res = yield API.get(`get-employee-links?id=${action.payload.id}`);
    if (res.data.meta.code === 1) {
      yield put(getUserExternalLinkSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getUserExternalLinkFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getUserExternalLinkFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchAddEditExternalLinkUserAPI() {
  yield takeEvery(ADD_EDIT_EXTERNAL_LINK_USER, addEditExternalLinkUserRequest);
}

export function* watchGetUserExternalLinkAPI() {
  yield takeEvery(GET_USER_EXTERNAL_LINK, getUserExternalLinkRequest);
}

export default function* rootSaga() {
  yield all([watchAddEditExternalLinkUserAPI(), watchGetUserExternalLinkAPI()]);
}
