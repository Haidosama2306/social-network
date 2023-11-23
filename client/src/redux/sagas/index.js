import { all } from 'redux-saga/effects';
import authSaga from './authSaga/index'
import postSaga from './postSaga/index';
import messageSaga from './messageSaga/index';
function* rootSaga() {
    yield all([authSaga(), postSaga(), messageSaga()]);
  }
  
  export default rootSaga;