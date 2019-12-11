import { IAction, IUpsertCarStore, IUpsertCarPayload } from 'store/types';
import { UpsertCarsActions } from 'store/actions';

const initialState: IUpsertCarStore = {
  car: undefined,
  message: '',
  errors: {},
  isLoading: false,
};

export default (state: IUpsertCarStore = initialState, action: IAction<IUpsertCarPayload>): IUpsertCarStore => {
  switch (action.type) {
    case UpsertCarsActions.request: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UpsertCarsActions.success: {
      return {
        ...state,
        isLoading: false,
        car: action.payload.car,
      };
    }

    case UpsertCarsActions.failure: {
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        errors: action.payload.errors,
      };
    }

    case UpsertCarsActions.reset: {
      return initialState;
    }

    default:
      return state;
  }
};
