import { RouteProps } from 'react-router-dom';

export default interface IAuthRouteProps extends RouteProps {
  groupCode: string;
  isLoggedIn: boolean;
}
