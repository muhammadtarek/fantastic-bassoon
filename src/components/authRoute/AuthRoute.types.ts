import { RouteProps } from 'react-router-dom';
import UserType from 'store/types/User';

export default interface IAuthRouteProps extends RouteProps {
  userType: UserType;
  isLoggedIn: boolean;
}
