import { ILogin, IError, IUser } from 'store/types';
import { createRequestType, action, Actions } from './base';

export const User: Record<string, any> = createRequestType(
  'User',
  Actions.logout,
  Actions.authenticate,
  Actions.signup,
);

export const userActions = {
  login: (login: ILogin) => action(User[Actions.request], { ...login }),
  success: (token: string) => action(User[Actions.success], { token }),
  failure: ({ message }: IError<{}>) => action(User[Actions.failure], { message }),
  logout: () => action(User[Actions.logout]),
  authenticate: (token: string) => action(User[Actions.authenticate], { token }),
  signup: (user: Partial<IUser>) => action(User[Actions.signup], { ...user }),
};

export const { login, signup } = userActions;
export const { logout, authenticate } = userActions;
