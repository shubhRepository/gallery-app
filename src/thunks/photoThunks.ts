import { createAsyncThunk } from '@reduxjs/toolkit';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { RootState } from '../store/store';
import { removePhotosByUri } from '../store/photos';
import { exitSelectionMode } from '../store/photoActions';

export const deleteSelectedPhotos = createAsyncThunk<
  void,
  void,
  { state: RootState }
>('photos/deleteSelectedPhotos', async (_, { getState, dispatch }) => {
  const state = getState();
  const selectedUris = state.photoActions.selectedUris;

  if (selectedUris.length === 0) return;

  await CameraRoll.deletePhotos(selectedUris);

  dispatch(removePhotosByUri(selectedUris));

  dispatch(exitSelectionMode());
});
