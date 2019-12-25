import { IAction, IUpsertRentStore, IUpsertRentPayload } from 'store/types';
import { UpsertRentActions } from 'store/actions';

const initialState: IUpsertRentStore = {
  rent: undefined,
  message: '',
  errors: {},
  isLoading: false,
  isUpserted: false,
};

export default (state: IUpsertRentStore = initialState, action: IAction<IUpsertRentPayload>): IUpsertRentStore => {
  switch (action.type) {
    case UpsertRentActions.request: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UpsertRentActions.success: {
      return {
        ...state,
        isLoading: false,
        rent: action.payload.rent,
        isUpserted: true,
      };
    }

    case UpsertRentActions.failure: {
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        errors: action.payload.errors,
      };
    }

    case UpsertRentActions.reset: {
      return initialState;
    }

    default:
      return state;
  }
};
