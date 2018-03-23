import { combineReducers } from 'redux';
import filters from './filters/reducer';

const rootReducer = combineReducers({
  filters,
});

export default rootReducer;
