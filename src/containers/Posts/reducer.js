import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { backendUrl } from 'utils/constants';

export const initialState = {
    postList: []
};

export const fetchPostList = createAsyncThunk('posts/list', async (token) => {
    let response;

    await axios({
        method: 'get',
        url: `${backendUrl}/posts`
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
    }
});

export const postsSelector = (state) => state.postsReducer.postList;

export default PostsSlice.reducer;
