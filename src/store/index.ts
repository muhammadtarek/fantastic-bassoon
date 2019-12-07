import { createStore, applyMiddleware, compose, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';

export default function configureStore(initialState: Record<string, any>) {
  const sagaMiddleware = createSagaMiddleware();

  const store: Store = createStore(rootReducer, initialState, compose(applyMiddleware(sagaMiddleware)));

  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('store/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  // @ts-ignore
  store.runSaga = sagaMiddleware.run;
  // @ts-ignore
  store.close = () => store.dispatch();
  return store;
}
