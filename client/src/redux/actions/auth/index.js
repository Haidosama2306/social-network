import { createActions } from 'redux-actions';
export const getType = (reduxAction) => {
    return reduxAction().type;
  };
  export const login = createActions({
    loginRequest: (payload) => payload,
    loginSuccess: (payload) => payload,
    loginFailure: (err) => err,
  });
  export const register = createActions({
    registerRequest: (payload) => payload,
    registerSuccess: (payload) => payload,
    registerFailure: (err) => err,
  });