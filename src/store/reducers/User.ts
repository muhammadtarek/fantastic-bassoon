import { decode } from 'jsonwebtoken';
import { camelizeKeys } from 'humps';

import { IUserStore, IAction, IUserPayload } from 'store/types';
import { Actions, UserActions } from 'store/actions';
import UserType, { IUser } from 'store/types/User';

const initialState: IUserStore = {
  _id: '',
  address: '',
  email: '',
  name: '',
  phone: '',
  username: '',
  photo: '',
  type: UserType.normal,
  isLoading: false,
  isLoggedIn: false,
  message: '',
  errors: {},
};

export default (state: IUserStore = initialState, action: IAction<IUserPayload>) => {
  switch (action.type) {
    case UserActions.login:
    case UserActions.signup: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UserActions.success:
    case UserActions.authenticate: {
      const { token } = action.payload;
      const { _id, address, email, name, phone, photo, type, username } = camelizeKeys(decode(token) || {}) as IUser;

      return {
        ...state,
        _id,
        address,
        email,
        name,
        phone,
        photo,
        type,
        username,
        isLoading: false,
        isLoggedIn: true,
      };
    }

    case UserActions.failure: {
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        errors: action.payload.errors,
      };
    }

    case UserActions.logout: {
      return initialState;
    }

    default:
      return state;
  }
};
