import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../../actions/message';
import * as api from '../../../api/message';

function* fetchMessageSaga(action) {
  try {
    const bearerToken = localStorage.getItem('auth_token');
    const headers = {
  'Authorization': `Bearer ${bearerToken}`,
  'Content-Type': 'application/json',

};
console.log(action.payload);

    const messages = yield call(api.fetchMessages,action.payload,headers);
    yield put(actions.getMessages.getMessageSuccess(messages.data));
    localStorage.setItem('room', messages.data.room)
  } catch (err) {
    console.error(err);
    yield put(actions.getMessages.getMessageFailure(err));
  }
}
function* usersMessageSaga(action) {
  try {
    const bearerToken = localStorage.getItem('auth_token');
    const headers = {
  'Authorization': `Bearer ${bearerToken}`,
  'Content-Type': 'application/json',

};
    const messages = yield call(api.usersMessage,'',headers);
    yield put(actions.getUsersMessage.getUsersMessageSuccess(messages.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getUsersMessage.getUsersMessageFailure(err));
  }
}
function* createMessageSaga(action) {
  try {
    const bearerToken = localStorage.getItem('auth_token');
    const headers = {
  'Authorization': `Bearer ${bearerToken}`,
  'Content-Type': 'application/json',
}; 
    const message = yield call(api.createMessage,action.payload,headers );
    yield put(actions.createMessage.createMessageSuccess(message.data));
  } catch (err) {
    console.error(err);
    yield put(actions.createMessage.createMessageFailure(err));
  }
}

// function* createMessageSaga(action) {
//   try {
//     const message = yield call(api.createPost, action.payload);
//     yield put(actions.createMessage.createMessageSuccess(message.data));
//   } catch (err) {
//     console.error(err);
//     yield put(actions.createMessage.createMessageFailure(err));
//   }
// }



function* messageSaga() {
  yield takeLatest(actions.getMessages.getMessageRequest, fetchMessageSaga);
  yield takeLatest(actions.createMessage.createMessageRequest, createMessageSaga);
  yield takeLatest(actions.getUsersMessage.getUsersMessageRequest, usersMessageSaga);
}

// generator function ES6

export default messageSaga;