import React from 'react'; // eslint-disable-line
import { connect } from 'react-redux';

import { isFeatureAuthorized } from 'utils';
import { IUserStore } from 'store/types';
import IPermissionFlagProps from './PermissionFlag.types';

function PermissionFlag({ permissionKey, userType, children }: IPermissionFlagProps) {
  return isFeatureAuthorized(permissionKey, userType) ? children : <> </>;
}

const mapStateToProps = ({ user }: { user: IUserStore }) => ({
  userType: user.userType,
});

export default connect(mapStateToProps)(PermissionFlag);
