import { IError, ICar, IRent } from 'store/types';
import RentFormMode from 'store/types/Rent';
import action from './base';

export enum RentsActions {
  request = 'rent_request',
  success = 'rent_success',
  failure = 'rent_failure',
}

export enum UpsertRentActions {
  reset = 'upsertRent_reset',
  request = 'upsertRent_request',
  success = 'upsertRent_success',
  failure = 'upsertRent_failure',
}

export const rentsActions = {
  request: () => action(RentsActions.request),
  success: (rents: IRent[]) => action(RentsActions.success, { rents }),
  failure: ({ message, errors }: IError<IRent>) => action(RentsActions.failure, { message, errors }),
};

export const upsertRentActions = {
  rest: () => action(UpsertRentActions.reset),
  request: (rent: IRent, mode: RentFormMode) => action(UpsertRentActions.request, { rent, mode }),
  success: () => action(UpsertRentActions.success),
  failure: ({ message, errors }: IError<ICar>) => action(UpsertRentActions.failure, { message, errors }),
};

export const getAllRents = rentsActions.request;
export const resetRentForm = upsertRentActions.rest;
export const upsertRent = upsertRentActions.request;
export default rentsActions;
