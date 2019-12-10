import { combineReducers } from 'redux';

import user from './User';
import cars from './Cars';

const rootReducer = combineReducers({
  // @ts-ignore
  user,
  // @ts-ignore
  cars,
});

export default rootReducer;
