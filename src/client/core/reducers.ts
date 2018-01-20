import { combineReducers } from 'redux';
import filters from '../store/filters/reducer';

const rootReducer = combineReducers({
  filters,
});

export default rootReducer;
