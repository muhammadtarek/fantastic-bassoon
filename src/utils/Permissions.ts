const permissions: Map<string | string[], string[]> = new Map();

/**
 * Check if the user is authorized to access this feature
 *
 * @param key string | string[]
 * @param groupCode string
 * @returns boolean
 */
export const isFeatureAuthorized = (key: string | string[], groupCode: string) => {
  const permissionGroup: string[] = permissions.get(key) || [];
  return permissionGroup.includes(groupCode);
};

export default permissions;
