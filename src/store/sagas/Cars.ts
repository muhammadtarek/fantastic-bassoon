import { Api, Urls } from 'utils';
import { IAction, ICarsPayload, IUpsertCarStore } from 'store/types';
import { carsActions, upsertCarsAction } from 'store/actions';
import fetchEntity from './base';

export const getAll = (action: IAction<ICarsPayload>) => fetchEntity(carsActions, () => Api.get(Urls.cars), action);

export const addCar = (action: IAction<IUpsertCarStore>) =>
  fetchEntity(upsertCarsAction, () => Api.post(Urls.cars, action.payload.car), action);
