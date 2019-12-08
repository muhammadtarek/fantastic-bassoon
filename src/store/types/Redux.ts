export interface IError<T> {
  errors?: T;
  message?: string;
}

export interface IBaseState<T> extends IError<T> {
  isLoading?: boolean;
}

export interface IAction<T = any> {
  type: string;
  payload: T;
}
