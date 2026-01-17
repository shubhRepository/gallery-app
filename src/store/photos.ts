import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PhotosState = {
  photos: PhotoIdentifier[];
};

const initialState: PhotosState = {
  photos: [],
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<PhotoIdentifier[]>) => {
      state.photos = action.payload;
    },

    removePhotosByUri: (state, action: PayloadAction<string[]>) => {
      const toDelete = new Set(action.payload);

      state.photos = state.photos.filter(p => !toDelete.has(p.node.image.uri));
    },
  },
});

export const { setPhotos, removePhotosByUri } = photosSlice.actions;
export const photosReduces = photosSlice.reducer;
