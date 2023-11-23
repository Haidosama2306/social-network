import { INIT_STATE } from '../../constant';
import { getType, hideModalNotifi, showModalNotifi } from '../actions/modal/notifi';

export default function modalReducers(state = INIT_STATE.modal, action) {
  switch (action.type) {
    case getType(showModalNotifi):
      return {
        isOpen: true,
      };
    case getType(hideModalNotifi):
      return {
        isOpen: false,
      };
    default:
      return state;
  }
}