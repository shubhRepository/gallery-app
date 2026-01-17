import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { photosReduces } from '../store/photos';
import { albumsReducer } from './albums';
import { photoActionsReducer } from './photoActions';
import { appAlbumReducer } from './appAlbum';

const rootReducer = combineReducers({
  photos: photosReduces,
  albums: albumsReducer,
  photoActions: photoActionsReducer,
  appAlbums: appAlbumReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
