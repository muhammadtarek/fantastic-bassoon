import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Redirect, Route, useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { Spinner, Stack, SpinnerSize } from 'office-ui-fabric-react';
import Cookies from 'js-cookie';

import { AuthRoute, Header } from 'components';
import { IUserStore } from 'store/types';
import { logout as logoutAction, authenticate as authenticateAction } from 'store/actions';
import { filterContextualMenuItems, Constants } from 'utils';
import UserType from 'store/types/User';
import Landing from './landing';
import routes from './Routes';
import { getCommandBarItems, getFarCommandBarItems } from './CommandBarOptions';

interface IAuthLayoutProps {
  userType: UserType;
  name: string;
  isLoggedIn: boolean;
  logout: Function;
  authenticate: Function;
}

function AuthLayout(props: IAuthLayoutProps) {
  const { isLoggedIn, userType, name, authenticate, logout } = props;
  const history = useHistory();
  const routesComponents = [];

  const [isAuthenticating, setIsAuthenticating] = useState(true);

  /**
   * On page render, we check if AUTH_COOKIE is exists or not
   * If exists we decode the token and automatically log him in
   * Otherwise he will be redirected to login screen
   */
  useEffect(() => {
    const authToken = Cookies.get(Constants.AUTH_COOKIE);
    if (authToken) {
      authenticate(authToken);
    }
    setIsAuthenticating(false);
  }, [authenticate]);

  for (const route of routes) {
    const key = Array.isArray(route.path) ? route.path.join(',') : route.path;
    routesComponents.push(<AuthRoute key={key} {...route} />);
  }

  const loadingContainerStyles = () => ({
    root: {
      width: '100%',
      height: '100vh',
    },
  });

  return (
    <>
      {isLoggedIn && (
        <Header
          navItems={filterContextualMenuItems(userType, getCommandBarItems(history))}
          farItems={getFarCommandBarItems(history, logout)}
          name={name}
          isAdmin={userType === UserType.admin}
        />
      )}

      {isAuthenticating ? (
        <Stack horizontalAlign="center" verticalAlign="center" styles={loadingContainerStyles}>
          <Spinner size={SpinnerSize.large} />
        </Stack>
      ) : (
        <Switch>
          {routesComponents}
          <Route path="/login" component={Landing} />
          <Route path="/signup" component={Landing} />
          <Redirect to="/login" />
        </Switch>
      )}
    </>
  );
}

const mapStateToProps = ({ user }: { user: IUserStore }) => ({
  userType: user.userType,
  name: user.name,
  isLoggedIn: user.isLoggedIn,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { logout: logoutAction, authenticate: authenticateAction }),
)(AuthLayout);
