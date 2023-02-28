import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/saga";
import postSaga from "./post/sagas/postSaga";
import authorSaga from "./author/sagas/authorSaga";
import tagSaga from "./tags/sagas/tagSaga";

export function* rootSaga() {
  yield all([fork(authSaga), fork(postSaga), fork(authorSaga), fork(tagSaga)]);
}
