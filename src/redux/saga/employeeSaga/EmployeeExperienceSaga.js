import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import React from "react";

import {
  GET_EMPLOYEE_EXPERIENCE,
  ADD_EDIT_EMPLOYEE_EXPERIENCE,
  DELETE_EMPLOYEE_EXPERIENCE,
} from "../../action/types";
import {
  addEditEmployeeExperienceSuccess,
  addEditEmployeeExperienceFailure,
  getEmployeeExperienceSuccess,
  getEmployeeExperienceFailure,
  deleteEmployeeExperienceFailure,
  deleteEmployeeExperienceSuccess,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* addEditEmployeeExperienceRequest(action) {
  try {
    const res = yield API.post(`/add-edit-experience`, action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(addEditEmployeeExperienceSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      yield toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditEmployeeExperienceFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditEmployeeExperienceFailure());
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* getEmployeeExperienceRequest(action) {
  try {
    const res = yield API.get(`/get-employee-experiences?id=${action.payload}`);
    if (res.data.meta.code === 1) {
      yield put(getEmployeeExperienceSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getEmployeeExperienceFailure(res));
    }
  } catch (e) {
    yield put(getEmployeeExperienceFailure());
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}
function* deleteEmployeeExperienceRequest(action) {
  try {
    const res = yield API.delete(
      `/delete-experience?id=${action.payload.form}`
    );
    if (res.data.meta.code === 1) {
      yield put(deleteEmployeeExperienceSuccess(res?.data?.data));
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(deleteEmployeeExperienceFailure());
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(deleteEmployeeExperienceFailure());
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

export function* watchAddEditEmployeeExperienceAPI() {
  yield takeEvery(
    ADD_EDIT_EMPLOYEE_EXPERIENCE,
    addEditEmployeeExperienceRequest
  );
}
export function* watchGetEmployeeExperienceAPI() {
  yield takeEvery(GET_EMPLOYEE_EXPERIENCE, getEmployeeExperienceRequest);
}
export function* watchDeleteEmployeeExperienceAPI() {
  yield takeEvery(DELETE_EMPLOYEE_EXPERIENCE, deleteEmployeeExperienceRequest);
}
export default function* rootSaga() {
  yield all([
    watchAddEditEmployeeExperienceAPI(),
    watchGetEmployeeExperienceAPI(),
    watchDeleteEmployeeExperienceAPI(),
  ]);
}
