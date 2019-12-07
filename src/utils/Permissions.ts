import UserType from 'store/types/User';
import { LISTINGS } from './Constants';

const permissions: Map<string | string[], UserType[]> = new Map();

permissions.set(LISTINGS, [UserType.normal, UserType.admin]);

/**
 * Check if the user is authorized to access this feature
 *
 * @param key string | string[]
 * @param groupCode string
 * @returns boolean
 */
export const isFeatureAuthorized = (key: string | string[], userType: UserType) => {
  const permissionGroup: UserType[] = permissions.get(key) || [];
  return permissionGroup.includes(userType);
};

export default permissions;
