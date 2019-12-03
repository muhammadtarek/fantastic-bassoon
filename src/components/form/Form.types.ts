import { IStackProps } from 'office-ui-fabric-react';

// eslint-disable-next-line import/prefer-default-export
export enum FieldType {
  textField,
  comboBox,
  choiceGroup,
  datePicker,
  fileSelector,
}

export interface IField<T = any> {
  regex?: string;
  errorMessage?: string;
  type: FieldType;
  itemKey: string;
  props: T;
}

export interface IFieldsStack extends IStackProps {
  fields: IField[];
}

export interface IFormStoreProps<T = any> {
  data?: T;
  errors?: T;
  errorMessage?: string;
  isLoading?: boolean;
}

export interface IFormReduxProps<T = any> extends IFormStoreProps<T> {
  action: Function;
}

export interface IFormValidation<T = any> {
  errors?: T;
  errorMessage?: string;
  isValid: boolean;
}

export interface IFormProps<T = any> extends IStackProps {
  name: string;
  id: string;
  buttonText: string;
  fieldsStacks: IFieldsStack[];
  cancelButtonText?: string;
  cancelButtonOnClick?: Function;
  disabled?: boolean;
  onValidate?: (data: T) => IFormValidation<T>;
}
