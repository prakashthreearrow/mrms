import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import React from "react";

import {
  ADD_EDIT_CLIENT_DETAIL,
  GET_CLIENT_DETAIL,
  ADD_COMPANY,
} from "../../action/types";
import {
  getClientDetailsSuccess,
  getClientDetailsFailure,
  addEditClientDetailsSuccess,
  addEditClientDetailsFailure,
  addCompanySuccess,
  addCompanyFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* getClientDetailsRequest(action) {
  try {
    const res = yield API.get(
      `project/get-project-client?id=${action.payload.id}`
    );
    if (res.data.meta.code === 1) {
      yield put(getClientDetailsSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getClientDetailsFailure(res.data.data));
    }
  } catch (e) {
    yield put(getClientDetailsFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* addEditClientDetailsRequest(action) {
  try {
    const res = yield API.post("project/edit-company/", action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(addEditClientDetailsSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditClientDetailsFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditClientDetailsFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* addCompanyRequest(action) {
  try {
    const res = yield API.post("project/add-company", action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(addCompanySuccess());
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addCompanyFailure());
    }
  } catch (e) {
    yield put(addCompanyFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

export function* watchGetClientDetailsAPI() {
  yield takeEvery(GET_CLIENT_DETAIL, getClientDetailsRequest);
}

export function* watchAddEditClientDetailsAPI() {
  yield takeEvery(ADD_EDIT_CLIENT_DETAIL, addEditClientDetailsRequest);
}

export function* watchAddCompanyAPI() {
  yield takeEvery(ADD_COMPANY, addCompanyRequest);
}

export default function* rootSaga() {
  yield all([
    watchGetClientDetailsAPI(),
    watchAddEditClientDetailsAPI(),
    watchAddCompanyAPI(),
  ]);
}
