import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../../actions/post';
import * as api from '../../../api/post';

function* fetchPostSaga(action) {
    const posts = yield call(api.fetchPost);
    console.log('[posts]',posts);
    yield put(actions.getPosts.getPostsSuccess(posts));
}

function* postSaga() {
    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga)

}

export default postSaga;