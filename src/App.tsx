import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        {routes.map(route => (
          <Route key={route.path.toString()} path={route.path} component={route.component} />
        ))}
      </Switch>
    </div>
  );
};

export default App;
