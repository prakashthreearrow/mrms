import { all, takeEvery, put, call } from "redux-saga/effects";

import { getSkillMatrixSuccess, getSkillMatrixFailure } from "../../action";
import API from "../../../utils/api";
import { GET_SKILL_MATRIX } from "../../action/types";

function* getSkillMatrixRequest(actions) {
  try {
    const res = yield API.post("/get-skill-matrix", actions.payload.form);
    if (res.data.meta.code === 1) {
      yield put(getSkillMatrixSuccess(res?.data));
      yield call(actions.payload.callback);
    } else if (res.data.meta.code === 0) {
      yield put(getSkillMatrixFailure(res));
    }
  } catch (e) {
    yield put(getSkillMatrixFailure());
  }
}

export function* watchGetSkillMatrixAPI() {
  yield takeEvery(GET_SKILL_MATRIX, getSkillMatrixRequest);
}

export default function* rootSaga() {
  yield all([watchGetSkillMatrixAPI()]);
}
