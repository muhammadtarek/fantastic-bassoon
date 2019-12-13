import { Api, Urls } from 'utils';
import { IAction, ICarsPayload, IUpsertCarPayload } from 'store/types';
import { carsActions, upsertCarsAction } from 'store/actions';
import CarFormMode from 'store/types/Car';
import fetchEntity from './base';

export const getAll = (action: IAction<ICarsPayload>) => fetchEntity(carsActions, () => Api.get(Urls.cars), action);

export const upsertCar = (action: IAction<IUpsertCarPayload>) =>
  fetchEntity(
    upsertCarsAction,
    () => {
      if (action.payload.mode === CarFormMode.insert) {
        return Api.post(Urls.cars, action.payload.car);
      }

      // @ts-ignore
      return Api.put(`${Urls.cars}/${action.payload.car.id}`, action.payload.car);
    },
    action,
  );
