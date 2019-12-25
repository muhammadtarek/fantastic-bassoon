/* eslint-disable no-underscore-dangle */
import { IAction, ICarsStore, ICarsPayload, ICar } from 'store/types';
import { CarsActions } from 'store/actions';

const initialState: ICarsStore = {
  cars: [],
  message: '',
  errors: {},
  isLoading: false,
};

function isURL(str: string) {
  const exp = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
  const pattern = new RegExp(exp); // fragment locator
  return pattern.test(str);
}

function renderImage(image: string) {
  return isURL(image) ? `http://localhost:3006/${image}` : `data:image/gif;base64,${image}`;
}

export default (state: ICarsStore = initialState, action: IAction<ICarsPayload>): ICarsStore => {
  switch (action.type) {
    case CarsActions.request: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CarsActions.success: {
      const cars = action.payload.cars.map((car: ICar) => {
        const images = car.images.map((i: string) => renderImage(i));

        return {
          ...car,
          // @ts-ignore
          id: car._id,
          images,
        };
      });

      return {
        ...state,
        isLoading: false,
        cars,
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
