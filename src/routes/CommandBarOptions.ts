import { ICommandBarItemProps } from 'office-ui-fabric-react';

import { Constants } from 'utils';
import Locale from '../localization';

const getCommandBarItems = (history: Record<string, any>): ICommandBarItemProps[] => [
  {
    key: Constants.LISTINGS,
    text: Locale.header.listings,
    onClick: () => history.push(Constants.LISTINGS),
  },
];

const getFarCommandBarItems = (history: Record<string, any>, logout: Function): ICommandBarItemProps[] => [
  {
    name: Locale.header.logout,
    key: 'logout',
    onClick: () => logout(),
  },
];

export { getCommandBarItems, getFarCommandBarItems };
