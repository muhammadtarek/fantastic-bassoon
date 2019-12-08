// eslint-disable-next-line
export interface IApiResponse<T = Object> {
  data: T;
  status: number;
  errors: T;
  message: string;
}
