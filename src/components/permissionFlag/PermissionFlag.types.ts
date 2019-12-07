import UserType from 'store/types/User';

export default interface IPermissionFlagProps {
  permissionKey: string;
  userType: UserType;
  children: any;
}
