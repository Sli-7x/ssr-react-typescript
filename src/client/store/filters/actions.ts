import Api from '../../core/api';
import { FILTERS_LOADED } from './constants';

export const fetchFilters = () => async (dispatch: any) => {
  const res = await Api.get('filters');

  if (res && res.success && res.content) {
    dispatch({
      type: FILTERS_LOADED,
      payload: res.content.objectsTypes,
    });
  }
};
