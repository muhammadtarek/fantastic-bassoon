import { Api, Urls } from 'utils';
import { IAction, IRentsPayload, IUpsertRentPayload } from 'store/types';
import { rentsActions, upsertRentActions } from 'store/actions';
import RentFormMode from 'store/types/Rent';
import fetchEntity from './base';

export const getAllRents = (action: IAction<IRentsPayload>) =>
  fetchEntity(rentsActions, () => Api.get(Urls.rents), action);

export const upsertRent = (action: IAction<IUpsertRentPayload>) =>
  fetchEntity(
    upsertRentActions,
    () => {
      switch (action.payload.mode) {
        case RentFormMode.insert: {
          // @ts-ignore
          return Api.post(`${Urls.rents}/${action.payload.rent.carId}`, action.payload.rent);
        }

        case RentFormMode.update: {
          // @ts-ignore
          return Api.put(`${Urls.rents}/${action.payload.rent.id}`, action.payload.rent);
        }

        case RentFormMode.delete: {
          // @ts-ignore
          return Api.delete(`${Urls.rents}/${action.payload.rent.id}`);
        }

        default: {
          break;
        }
      }

      return () => {};
    },
    action,
  );
