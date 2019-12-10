import { Api, Urls } from 'utils';
import { IAction, ICarsPayload } from 'store/types';
import { carsActions } from 'store/actions';
import fetchEntity from './base';

export const getAll = (action: IAction<ICarsPayload>) => fetchEntity(carsActions, () => Api.get(Urls.cars), action);

export const temp = 1;
