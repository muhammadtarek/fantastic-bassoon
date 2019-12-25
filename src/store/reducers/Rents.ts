/* eslint-disable no-underscore-dangle */
import { IAction, IRentsStore, IRentsPayload } from 'store/types';
import { RentsActions } from 'store/actions';

const initialState: IRentsStore = {
  rents: [],
  message: '',
  errors: {},
  isLoading: false,
};

export default (state: IRentsStore = initialState, action: IAction<IRentsPayload>): IRentsStore => {
  switch (action.type) {
    case RentsActions.request: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case RentsActions.success: {
      return {
        ...state,
        isLoading: false,
        rents: action.payload.rents,
      };
    }

    case RentsActions.failure: {
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        errors: action.payload.errors,
      };
    }

    default:
      return state;
  }
};
