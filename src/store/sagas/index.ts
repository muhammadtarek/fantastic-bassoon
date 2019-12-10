import { takeLatest } from 'redux-saga/effects';

import { UserActions } from 'store/actions';
import { saveToken, removeToken, loginUser, signupUser } from './User';

export default function* root() {
  yield takeLatest(UserActions.login, loginUser);
  yield takeLatest(UserActions.signup, signupUser);
  // @ts-ignore
  yield takeLatest(UserActions.success, saveToken);
  yield takeLatest(UserActions.logout, removeToken);
}
