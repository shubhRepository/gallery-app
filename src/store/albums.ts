import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlbumWithCover } from '../types/Albums';

type AlbumsState = {
  albums: AlbumWithCover[];
};

const initialState: AlbumsState = {
  albums: [],
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAlbums: (state, action: PayloadAction<AlbumWithCover[]>) => {
      state.albums = action.payload;
    },
  },
});

export const { setAlbums } = albumsSlice.actions;
export const albumsReducer = albumsSlice.reducer;
