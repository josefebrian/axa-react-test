import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { backendUrl } from 'utils/constants';

export const initialState = {
    albumList: []
};

export const fetchAlbumList = createAsyncThunk('albums/list', async (token) => {
    let response;

    await axios({
        method: 'get',
        url: `${backendUrl}/albums`
    }).then((r) => response = r.data);

    return response;
});

export const ALBUMS_REDUCER = 'ALBUMS_REDUCER';
const AlbumsSlice = createSlice({
    name: ALBUMS_REDUCER,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAlbumList.fulfilled, (state, action) => {
            state.albumList = action.payload
        });
    }
});

export const albumsSelector = (state) => state.albumsReducer.albumList;

export default AlbumsSlice.reducer;
