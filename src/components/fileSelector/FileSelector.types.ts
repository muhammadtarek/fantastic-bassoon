import { IButtonProps } from 'office-ui-fabric-react';

// eslint-disable-next-line import/prefer-default-export
export interface IFileSelectorProps extends IButtonProps {
  id: string;
  onFileSelect?: Function;
  isLoading: boolean;
}
