// eslint-disable-next-line
export interface IApiResponse<T = Object> {
  result: T;
  status: number;
  errors: T;
  message: string;
}
