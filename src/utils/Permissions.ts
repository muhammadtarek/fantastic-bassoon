import UserType from 'store/types/User';
import { SIGNUP, LOGIN, LISTINGS } from './Constants';

const permissions: Map<string | string[], UserType[]> = new Map();

permissions.set(SIGNUP, [UserType.normal, UserType.admin]);
permissions.set(LOGIN, [UserType.normal, UserType.admin]);
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
