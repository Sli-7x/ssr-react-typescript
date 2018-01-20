import Api from '../../core/api';
import { FILTERS_LOADED } from './constants';

export const fetchFilters = () => (dispatch: any) => {
  return Api.get('filters').then((res: any) => {
    dispatch({
      type: FILTERS_LOADED,
      payload: res.content.objectsTypes,
    });
  });
};
