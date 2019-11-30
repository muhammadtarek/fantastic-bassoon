import React from 'react';

import { isFeatureAuthorized } from 'utils';
import IPermissionFlagProps from './PermissionFlag.types';

function PermissionFlag({ permissionKey, groupCode, children }: IPermissionFlagProps) {
  return isFeatureAuthorized(permissionKey, groupCode) ? children : <> </>;
}

export default PermissionFlag;
