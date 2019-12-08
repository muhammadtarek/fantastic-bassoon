import { combineReducers } from 'redux';

import user from './User';

const rootReducer = combineReducers({
  // @ts-ignore
  user,
});

export default rootReducer;
