import { IError, ICar } from 'store/types';
import action from './base';

export enum CarsActions {
  request = 'cars_request',
  success = 'cars_success',
  failure = 'cars_failure',
}

export const carsActions = {
  request: () => action(CarsActions.request),
  success: (cars: ICar[]) => action(CarsActions.success, { cars }),
  failure: ({ message, errors }: IError<ICar>) => action(CarsActions.failure, { message, errors }),
};

export const getAllCars = carsActions.request;
export default carsActions;
