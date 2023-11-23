import { createAction } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const showModalSearch = createAction('SHOW_CREATE_SEARCH_MODAL');
export const hideModalSearch = createAction('HIDE_CREATE_SEARCH_MODAL');
