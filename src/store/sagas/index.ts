import { takeLatest } from 'redux-saga/effects';

import { Actions, User } from 'store/actions';
import { saveToken, removeToken, loginUser, signupUser } from './User';

export default function* root() {
  yield takeLatest(User[Actions.login], loginUser);
  yield takeLatest(User[Actions.signup], signupUser);
  yield takeLatest(User[Actions.success], saveToken);
  yield takeLatest(User[Actions.logout], removeToken);
}
