import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { backendUrl } from 'utils/constants';

export const initialState = {
    userList: []
};

export const fetchUserList = createAsyncThunk('users/list', async (token) => {
    let response;

    await axios({
        method: 'get',
        url: `${backendUrl}/users`
    }).then((r) => response = r.data);

    return response;
});

export const HOME_REDUCER = 'HOME_REDUCER';
const AppSlice = createSlice({
    name: HOME_REDUCER,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserList.fulfilled, (state, action) => {
            state.userList = action.payload
        });
    }
});

export const usersSelector = (state) => state.homeReducer.userList;

export default AppSlice.reducer;
