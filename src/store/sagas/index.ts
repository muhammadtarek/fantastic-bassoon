import { takeLatest } from 'redux-saga/effects';

import { UserActions, CarsActions, UpsertCarsActions, UpsertRentActions, RentsActions } from 'store/actions';
import { saveToken, removeToken, loginUser, signupUser } from './User';
import { getAll, upsertCar } from './Cars';
import { getAllRents, upsertRent } from './Rents';

export default function* root() {
  yield takeLatest(UserActions.login, loginUser);
  yield takeLatest(UserActions.signup, signupUser);
  // @ts-ignore
  yield takeLatest(UserActions.success, saveToken);
  yield takeLatest(UserActions.logout, removeToken);
  yield takeLatest(CarsActions.request, getAll);
  yield takeLatest(UpsertCarsActions.success, getAll);
  yield takeLatest(UpsertCarsActions.request, upsertCar);
  yield takeLatest(RentsActions.request, getAllRents);
  yield takeLatest(UpsertRentActions.success, getAllRents);
  yield takeLatest(UpsertRentActions.request, upsertRent);
}
