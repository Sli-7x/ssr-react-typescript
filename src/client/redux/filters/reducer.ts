import { FILTERS_FETCH, FILTERS_SUCCESS, FILTERS_FAILED } from './constants';

export interface IFilter {
  id: number;
  title: string;
}

export interface IInitialState {
  list: IFilter[];
  fetching: boolean;
  fetched: boolean;
  errors: any;
}

export const initialState: IInitialState = {
  list: [],
  fetching: false,
  fetched: false,
  errors: null,
};

export default function reducer(state: IInitialState = initialState, action: any) {
  switch (action.type) {
    case FILTERS_FETCH:
      return { ...state, fetching: true, fetched: false, errors: null, list: [] };
    case FILTERS_SUCCESS:
      return { ...state, list: action.payload, fetching: false, fetched: true, errors: null };
    case FILTERS_FAILED:
      return { ...state, list: [], errors: action.payload, fetching: false, fetched: false };
    default:
      return state;
  }
}
