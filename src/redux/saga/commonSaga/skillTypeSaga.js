import { all, takeEvery, put } from "redux-saga/effects";

import { GET_SKILL_TYPES } from "../../action/types";
import { getSkillTypeSuccess, getSkillTypeFailure } from "../../action";
import API from "../../../utils/api";

function* getSkillTypeRequest() {
  try {
    const res = yield API.get("/skill-types");
    if (res.data.meta.code === 1) {
      yield put(getSkillTypeSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getSkillTypeFailure(res));
    }
  } catch (e) {
    yield put(getSkillTypeFailure());
  }
}

export function* watchGetSkillTypeAPI() {
  yield takeEvery(GET_SKILL_TYPES, getSkillTypeRequest);
}

export default function* rootSaga() {
  yield all([watchGetSkillTypeAPI()]);
}
