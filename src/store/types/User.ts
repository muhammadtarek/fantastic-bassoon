import { IBaseState, IError } from './Redux';

enum UserType {
  normal,
  admin,
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  phone: string;
  address: string;
  photo: string;
  type: UserType;
}

export interface IUserStore extends IUser, IBaseState<{}> {
  isLoggedIn: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserPayload extends IError<{}> {
  token: string;
}

export default UserType;
