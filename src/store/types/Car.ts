import { IBaseState, IError } from './Redux';

export interface ICar {
  name: string;
  color: string;
  price: number;
  images: string[];
  description: string;
}

export interface ICarsStore extends IBaseState<{}> {
  cars: ICar[];
}

export interface IUpsertCarStore extends IBaseState<{}> {
  car?: ICar;
  isUpserted: boolean;
}

export interface ICarsPayload extends IError<{}> {
  cars: ICar[];
}

export interface IUpsertCarPayload extends IError<{}> {
  car?: ICar;
}
