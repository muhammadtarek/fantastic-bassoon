import { IBaseState, IError } from './Redux';

enum RentFormMode {
  insert,
  update,
  delete,
}

export interface IRent {
  id?: string;
  userId?: string;
  carId: string;
  startTime: string;
  endTime: string;
}

export interface IRentsStore extends IBaseState<{}> {
  rents: IRent[];
}

export interface IUpsertRentStore extends IBaseState<{}> {
  rent?: IRent;
  isUpserted: boolean;
}

export interface IRentsPayload extends IError<{}> {
  rents: IRent[];
}

export interface IUpsertRentPayload extends IError<{}> {
  rent?: IRent;
  mode: RentFormMode;
}

export default RentFormMode;
