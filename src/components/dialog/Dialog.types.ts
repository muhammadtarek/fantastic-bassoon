import { IDialogProps as IOfficeDialogProps } from 'office-ui-fabric-react';

export interface IDialogBase<T = any> {
  show: boolean;
  isLoading: boolean;
  errorMessage?: string;
  errors?: Record<string, T>;
  hideDialog: Function;
}

export interface IDialogProps<T = any> extends IOfficeDialogProps, IDialogBase<T> {
  dialogKey: string;
  title: string;
  mainActionText: string;
  isAlert?: boolean;
  mainAction: Function;
  children?: any;
}
