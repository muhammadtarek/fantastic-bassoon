import { ICommandBarItemProps } from 'office-ui-fabric-react';

export default interface IHeaderProps {
  name: string;
  isAdmin: boolean;
  navItems: ICommandBarItemProps[];
  farItems: ICommandBarItemProps[];
}
