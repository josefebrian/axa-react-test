import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { backendUrl } from 'utils/constants';

export const initialState = {
    photosList: {
        records: [],
        loading: false
    }
};

export const fetchPhotosList = createAsyncThunk('photos/list', async (params) => {
    let response;
    const { id } = params

    await axios({
        method: 'get',
        url: `${backendUrl}/albums/${id}/photos`
    }).then((r) => response = r.data);

    return response;
});

export const PHOTOS_REDUCER = 'PHOTOS_REDUCER';
const PhotosSlice = createSlice({
    name: PHOTOS_REDUCER,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPhotosList.pending, (state, action) => {
            state.photosList.loading = true;
            state.photosList.records = action.payload
        });
        builder.addCase(fetchPhotosList.fulfilled, (state, action) => {
            state.photosList.loading = false;
            state.photosList.records = action.payload
        });
    }
});

export const photosSelector = (state) => state.photosReducer.photosList;

export default PhotosSlice.reducer;
