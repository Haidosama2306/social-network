import { INIT_STATE } from '../../constant';
import { hideModalSearch, showModalSearch,getType } from '../actions/modalSearch';

export default function modalSearchReducers(state = INIT_STATE.modalSearch, action) {
  switch (action.type) {
    case getType(showModalSearch):
      return {
        isShow: true,
      };
    case getType(hideModalSearch):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}