import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isFeatureAuthorized, isFeatureEnabled } from 'utils';
import IAuthRouteProps from './AuthRoute.types';

function AuthRoute(props: IAuthRouteProps) {
  const { path, groupCode, component, isLoggedIn } = props;

  // We always check if the user is logged in, if not we redirect to /login
  if (isLoggedIn) {
    if (path) {
      // Check if the page is enable in feature flags
      if (isFeatureEnabled(path.toString())) {
        // Check if the user is authorized to access this page
        if (isFeatureAuthorized(path, groupCode)) {
          return <Route path={path} component={component} />;
        }

        // If not, we show that the user is not authorized
        return <h1>not auth</h1>;
      }
    }
  } else {
    return <Redirect to="/login" />;
  }

  // Should not happen on normal bases
  return <h1>something went wrong</h1>;
}

export default AuthRoute;
