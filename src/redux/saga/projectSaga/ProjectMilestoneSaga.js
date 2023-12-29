import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import React from "react";

import {
  GET_PROJECT_MILESTONE,
  ADD_EDIT_PROJECT_MILESTONE,
  DELETE_PROJECT_MILESTONE,
} from "../../action/types";
import {
  getProjectMilestonesSuccess,
  getProjectMilestonesFailure,
  addEditProjectMilestonesSuccess,
  addEditProjectMilestonesFailure,
  deleteProjectMilestoneSuccess,
  deleteProjectMilestoneFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* addEditProjectMilestoneRequest(action) {
  try {
    const res = yield API.post(
      "/project/add-edit-milestone",
      action.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(addEditProjectMilestonesSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditProjectMilestonesFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditProjectMilestonesFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* getProjectMilestoneRequest(action) {
  try {
    const res = yield API.get(
      `/project/get-milestone-list?id=${action.payload.id}`
    );
    if (res.data.meta.code === 1) {
      yield put(getProjectMilestonesSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getProjectMilestonesFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getProjectMilestonesFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* deleteProjectMilestoneRequest(action) {
  try {
    const res = yield API.delete(
      `/project/delete-milestone?id=${action.payload.id}`
    );
    if (res.data.meta.code === 1) {
      yield put(deleteProjectMilestoneSuccess());
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(deleteProjectMilestoneFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(deleteProjectMilestoneFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchAddEditProjectMilestoneAPI() {
  yield takeEvery(ADD_EDIT_PROJECT_MILESTONE, addEditProjectMilestoneRequest);
}

export function* watchGetProjectMilestoneAPI() {
  yield takeEvery(GET_PROJECT_MILESTONE, getProjectMilestoneRequest);
}

export function* watchDeleteProjectMilestoneAPI() {
  yield takeEvery(DELETE_PROJECT_MILESTONE, deleteProjectMilestoneRequest);
}

export default function* rootSaga() {
  yield all([
    watchAddEditProjectMilestoneAPI(),
    watchGetProjectMilestoneAPI(),
    watchDeleteProjectMilestoneAPI(),
  ]);
}
