import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppAlbum } from '../types/Albums';

type AppAlbumState = {
  appAlbums: AppAlbum[];
};

const initialState: AppAlbumState = {
  appAlbums: [],
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAppAlbums(state, action: PayloadAction<AppAlbum[]>) {
      state.appAlbums = action.payload;
    },
  },
});

export const { setAppAlbums } = albumsSlice.actions;
export const appAlbumReducer = albumsSlice.reducer;
