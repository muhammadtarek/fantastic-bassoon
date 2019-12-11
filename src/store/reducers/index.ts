import { combineReducers } from 'redux';

import user from './User';
import cars from './Cars';
import upsertCar from './UpsertCar';

const rootReducer = combineReducers({
  // @ts-ignore
  user,
  // @ts-ignore
  cars,
  // @ts-ignore
  upsertCar,
});

export default rootReducer;
