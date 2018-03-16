import Api from '../../core/api';
import { FILTERS_LOADED } from './constants';

export const fetchFilters = () => (dispatch: any) => {
  return Api.get('filters').then((res: any) => {
    if (res && res.success && res.content) {
      dispatch({
        type: FILTERS_LOADED,
        payload: res.content.objectsTypes,
      });
    }
  });
};
