import { Api } from '../core';
export const FILTERS_LOADED = '@ssr/filters/loaded';

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

export const fetchFilters = () => async (dispatch: any) => {
  const res = await Api.get('filters');

  if (res && res.success && res.content) {
    dispatch({
      type: FILTERS_LOADED,
      payload: res.content.objectsTypes,
    });
  }
};
