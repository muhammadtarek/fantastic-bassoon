import Cookies from 'js-cookie';
import { decode } from 'jsonwebtoken';

import { Constants, Api, Urls } from 'utils';
import { IAction, ILogin, IUser } from 'store/types';
import { userActions } from 'store/actions';
import fetchEntity from './base';

export const loginUser = (action: IAction<ILogin>) =>
  fetchEntity(userActions, () => Api.post(Urls.login, action.payload), action);

export const signupUser = (action: IAction<IUser>) =>
  fetchEntity(userActions, () => Api.post(Urls.signup, action.payload), action);

export function* saveToken({ payload }: { payload: Record<string, string> }) {
  // @ts-ignore
  const { exp } = decode(payload.token);
  Cookies.set(Constants.AUTH_COOKIE, payload.token, { expires: new Date(new Date(0).setUTCSeconds(exp)) });
  yield true;
}

export function* removeToken() {
  Cookies.remove(Constants.AUTH_COOKIE);
  window.location.reload();
  yield true;
}
