import { IError, ICar } from 'store/types';
import CarFormMode from 'store/types/Car';
import action from './base';

export enum CarsActions {
  request = 'cars_request',
  success = 'cars_success',
  failure = 'cars_failure',
}

export enum UpsertCarsActions {
  reset = 'upsertCars_reset',
  request = 'upsertCars_request',
  success = 'upsertCars_success',
  failure = 'upsertCars_failure',
}

export const carsActions = {
  request: () => action(CarsActions.request),
  success: (cars: ICar[]) => action(CarsActions.success, { cars }),
  failure: ({ message, errors }: IError<ICar>) => action(CarsActions.failure, { message, errors }),
};

export const upsertCarsActions = {
  rest: () => action(UpsertCarsActions.reset),
  request: (car: ICar, mode: CarFormMode) => action(UpsertCarsActions.request, { car, mode }),
  success: () => action(UpsertCarsActions.success),
  failure: ({ message, errors }: IError<ICar>) => action(UpsertCarsActions.failure, { message, errors }),
};

export const getAllCars = carsActions.request;
export const resetCarForm = upsertCarsActions.rest;
export const upsertCar = upsertCarsActions.request;
export default carsActions;
