import { Api } from '../../core';
import { FILTERS_FETCH, FILTERS_SUCCESS, FILTERS_FAILED } from './constants';

export const loadFilters = () => ({
  type: FILTERS_FETCH,
});

export const filtersLoaded = (objectsTypes: any[]) => ({
  type: FILTERS_SUCCESS,
  payload: objectsTypes,
});

export const setError = (error: Error) => ({
  type: FILTERS_FAILED,
  payload: error,
});

export const fetchFilters = () => async (dispatch: any) => {
  dispatch(loadFilters());

  try {
    const res = await Api.get('filters');

    dispatch(filtersLoaded(res.content.objectsTypes));
  } catch (err) {
    dispatch(setError(err.message));
  }
};
