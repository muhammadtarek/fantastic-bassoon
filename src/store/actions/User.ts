import { ILogin, IError, IUser } from 'store/types';
import { action } from './base';

export enum UserActions {
  login = 'user_login',
  signup = 'user_signup',
  success = 'user_loggedin',
  failure = 'user_failure',
  logout = 'user_logout',
  authenticate = 'user_authenticate',
}

export const userActions = {
  login: (login: ILogin) => action(UserActions.login, { ...login }),
  success: (token: string) => action(UserActions.success, { token }),
  failure: ({ message }: IError<{}>) => action(UserActions.failure, { message }),
  logout: () => action(UserActions.logout),
  authenticate: (token: string) => action(UserActions.authenticate, { token }),
  signup: (user: Partial<IUser>) => action(UserActions.signup, { ...user }),
};

export const { logout, authenticate, login, signup } = userActions;
