import { combineReducers } from 'redux';

import user from './User';
import cars from './Cars';
import upsertCar from './UpsertCar';
import rents from './Rents';
import upsertRent from './UpsertRent';

const rootReducer = combineReducers({
  // @ts-ignore
  user,
  // @ts-ignore
  cars,
  // @ts-ignore
  upsertCar,
  // @ts-ignore
  rents,
  // @ts-ignore
  upsertRent,
});

export default rootReducer;
