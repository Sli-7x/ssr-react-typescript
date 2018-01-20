import { FILTERS_LOADED } from './constants';

const initialState = {
  filters: [],
};

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
  case FILTERS_LOADED:
    return { ...state, filters: action.payload };
  default:
    return state;
  }
}
