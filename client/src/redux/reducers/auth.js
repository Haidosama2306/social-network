import { INIT_STATE } from '../../constant';
import { getType,login, register } from '../actions/auth';

export default function authReducers(state = INIT_STATE.auth, action) {
  switch (action.type) {
    case getType(login.loginRequest):
      return {
        ...state,
        isLoading: true,
        
      };
    case getType(login.loginSuccess):
      return {
        ...state,
        isLoading: false,
        auth: true,
        data: action.payload,
      };
    case getType(login.loginFailure):
      return {
        ...state,
        isLoading: false,
        auth: false,
        data: action.payload.response.data
      };
      case getType(register.registerRequest):
        return {
          ...state,
          isLoading: true,
          
        };
      case getType(register.registerSuccess):
        return {
          ...state,
          isLoading: false,
          auth: true,
          data: action.payload,
        };
      case getType(register.registerFailure):
        return {
          ...state,
          isLoading: false,
          auth: false,
          data: action.payload.response.data
        };
    default:
      return state;
  }
}