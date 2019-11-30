import { ICommandBarItemProps } from 'office-ui-fabric-react';

export default interface IHeaderProps {
  userDesc: string;
  navItems: ICommandBarItemProps[];
  farItems: ICommandBarItemProps[];
}
