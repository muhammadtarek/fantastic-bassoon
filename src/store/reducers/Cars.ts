import { IAction, ICarsStore, ICarsPayload } from 'store/types';
import { CarsActions } from 'store/actions';

const initialState: ICarsStore = {
  cars: [],
  message: '',
  errors: {},
  isLoading: false,
};

export default (state: ICarsStore = initialState, action: IAction<ICarsPayload>): ICarsStore => {
  switch (action.type) {
    case CarsActions.request: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CarsActions.success: {
      return {
        ...state,
        isLoading: false,
        cars: action.payload.cars,
      };
    }

    case CarsActions.failure: {
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
