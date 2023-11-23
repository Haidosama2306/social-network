import { createActions } from 'redux-actions';

export const getType = (ReduxAction) => {
    return ReduxAction().type;
}

export const getPosts = createActions({
    getPostsRequest: undefined,
    getPostsSuccess: (payload) => payload,
    getPostsFailure: (err) => err,
});