import { IContextualMenuItem } from 'office-ui-fabric-react';

import { isFeatureAuthorized } from 'utils/Permissions';
import { isFeatureEnabled } from 'utils/FeatureFlags';
import UserType from 'store/types/User';

/**
 * Filter command bar items due to their permissions and feature flags
 *
 * @param groupCode string
 * @param menuItems IContextualMenuItem[]
 */
const filterContextualMenuItems = (userType: UserType, menuItems: IContextualMenuItem[]): IContextualMenuItem[] => {
  const filteredMenuItems = [];
  for (const menuItem of menuItems) {
    const { key } = menuItem;
    // Check if the feature is enabled
    if (isFeatureEnabled(key)) {
      // Validate authentication for the parent item
      if (isFeatureAuthorized(key, userType)) {
        const filteredItem = menuItem;

        // Replace all items with authenticated items
        if (filteredItem.subMenuProps && filteredItem.subMenuProps.items) {
          // We continue going as it's possible to create an infinite lists
          filteredItem.subMenuProps.items = filterContextualMenuItems(userType, filteredItem.subMenuProps.items);
        }

        filteredMenuItems.push(filteredItem);
      }
    }
  }

  return filteredMenuItems;
};

const tmp = 0;

export { filterContextualMenuItems, tmp };
