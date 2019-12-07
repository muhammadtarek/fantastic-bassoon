import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { Customizer } from 'office-ui-fabric-react';

import { theme } from 'utils';
import configureStore from 'store';
import root from 'store/sagas';
import Routes from 'routes';

// @ts-ignore
const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line
// @ts-ignore
store.runSaga(root);

function App() {
  // @ts-ignore
  const routesComponent = <Routes />;

  return (
    <div className="App">
      <Customizer>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Router>{routesComponent}</Router>
          </Provider>
        </ThemeProvider>
      </Customizer>
    </div>
  );
}

export default App;
