import React from "react";
import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  ADD_EDIT_DEPARTMENT,
  ADD_EDIT_DESIGNATION,
  GET_DESIGNATION_FILTER,
} from "../../action/types";
import {
  addEditDepartmentSuccess,
  addEditDepartmentFailure,
  addEditDesignationSuccess,
  addEditDesignationFailure,
  getDesignationFilterSuccess,
  getDesignationFilterFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* addEditDepartmentRequest(action) {
  try {
    const res = yield API.post("/add-edit-department", action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(addEditDepartmentSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditDepartmentFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditDepartmentFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}
function* addEditDesignationRequest(action) {
  try {
    const res = yield API.post("/add-edit-designation", action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(addEditDesignationSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditDesignationFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditDesignationFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}
function* getDesignationFilterRequest(action) {
  try {
    const res = yield API.get(
      `/get-designation-filter?department_id=${action?.payload?.form?.department_id}`
    );
    if (res.data.meta.code === 1) {
      yield put(getDesignationFilterSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
    } else if (res.data.meta.code === 0) {
      yield put(getDesignationFilterFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getDesignationFilterFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchAddEditDepartmentAPI() {
  yield takeEvery(ADD_EDIT_DEPARTMENT, addEditDepartmentRequest);
}
export function* watchAddEditDesignationAPI() {
  yield takeEvery(ADD_EDIT_DESIGNATION, addEditDesignationRequest);
}
export function* watchGetDesignationFilterAPI() {
  yield takeEvery(GET_DESIGNATION_FILTER, getDesignationFilterRequest);
}

export default function* rootSaga() {
  yield all([
    watchAddEditDepartmentAPI(),
    watchAddEditDesignationAPI(),
    watchGetDesignationFilterAPI(),
  ]);
}
