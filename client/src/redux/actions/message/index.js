import { createActions } from 'redux-actions';
export const getType = (reduxAction) => {
    return reduxAction().type;
  };
  export const getMessages = createActions({
    getMessageRequest: (payload) => payload,
    getMessageSuccess: (payload) => payload,
    getMessageFailure: (err) => err,
  });
  export const getUsersMessage = createActions({
    getUsersMessageRequest: (payload) => payload,
    getUsersMessageSuccess: (payload) => payload,
    getUsersMessageFailure: (err) => err,
  });
  export const createMessage = createActions({
    createMessageRequest: (payload) => payload,
    createMessageSuccess: (payload) => payload,
    createMessageFailure: (err) => err,
  });
  export const removeAllMessage = createActions({
    removeAllMessageRequest: (payload) => payload,
    removeAllMessageSuccess: (payload) => payload,
    removeAllMessageFailure: (err) => err,
  });