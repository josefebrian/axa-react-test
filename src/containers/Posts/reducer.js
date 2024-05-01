import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { backendUrl } from 'utils/constants';

export const initialState = {
    postList: [],
    commentsList: {
        loading: false,
        records: []
    }
};

export const fetchPostList = createAsyncThunk('posts/list', async () => {
    let response;

    await axios({
        method: 'get',
        url: `${backendUrl}/posts`
    }).then((r) => response = r.data);

    return response;
});

export const fetchComments = createAsyncThunk('posts/comments', async (params) => {
    const { id } = params

    let response;

    await axios({
        method: 'get',
        url: `${backendUrl}/posts/${id}/comments`
    }).then((r) => response = r.data);

    return response;
});

export const deleteComment = createAsyncThunk('posts/comments/delete', async (params) => {
    const { id } = params

    let response;

    await axios({
        method: 'delete',
        url: `${backendUrl}/comments/${id}`
    }).then((r) => response = r.data);

    return response;
});

export const deletePost = createAsyncThunk('posts/delete', async (params) => {
    const { id } = params

    let response;

    await axios({
        method: 'delete',
        url: `${backendUrl}/posts/${id}`
    }).then((r) => response = r.data);

    return response;
});

export const editPost = createAsyncThunk('posts/edit', async (params) => {
    const { id, title, body, userId } = params

    let response;

    const data = {
        id,
        title,
        body,
        userId,
    };

    await axios({
        method: 'put',
        url: `${backendUrl}/posts/${id}`,
        data
    }).then((r) => response = r.data);

    return response;
});

export const editComment = createAsyncThunk('posts/comment/edit', async (params) => {
    const { id, name, email, body, postId } = params

    let response;

    const data = {
        id,
        name,
        email,
        body,
        postId,
    };

    await axios({
        method: 'put',
        url: `${backendUrl}/comments/${id}`,
        data
    }).then((r) => response = r.data);

    return response;
});

export const POSTS_REDUCER = 'POSTS_REDUCER';
const PostsSlice = createSlice({
    name: POSTS_REDUCER,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostList.fulfilled, (state, action) => {
            state.postList = action.payload
        });

        builder.addCase(fetchComments.pending, (state, action) => {
            state.commentsList.loading = true;
        });
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.commentsList.loading = false;
            state.commentsList.records = action.payload
        });
    }
});

export const postsSelector = (state) => state.postsReducer.postList;
export const commentsSelector = (state) => state.postsReducer.commentsList;

export default PostsSlice.reducer;
