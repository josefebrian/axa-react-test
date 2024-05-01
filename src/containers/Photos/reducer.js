import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { backendUrl } from 'utils/constants';

export const initialState = {
    photosList: []
};

export const fetchPhotosList = createAsyncThunk('photos/list', async (token) => {
    let response;

    await axios({
        method: 'get',
        url: `${backendUrl}/photos`
    }).then((r) => response = r.data);

    return response;
});

export const PHOTOS_REDUCER = 'PHOTOS_REDUCER';
const PhotosSlice = createSlice({
    name: PHOTOS_REDUCER,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPhotosList.fulfilled, (state, action) => {
            state.photosList = action.payload
        });
    }
});

export const photosSelector = (state) => state.photosReducer.photosList;

export default PhotosSlice.reducer;
