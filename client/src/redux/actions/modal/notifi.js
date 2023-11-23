import { createAction } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const showModalNotifi = createAction('SHOW_CREATE_NOTIFI_MODAL');
export const hideModalNotifi = createAction('HIDE_CREATE_NOTIFI_MODAL');
