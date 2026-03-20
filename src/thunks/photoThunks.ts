import { createAsyncThunk } from '@reduxjs/toolkit';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { RootState } from '../store/store';
import { removePhotosByUri } from '../store/photos';
import { clearSelection } from '../store/sectionActions';

export const deleteSelectedPhotos = createAsyncThunk<
  void,
  void,
  { state: RootState }
>('photos/deleteSelectedPhotos', async (_, { getState, dispatch }) => {
  const state = getState();
  const selectedBySection = state.sectionActions.selectedBySection;
  const selectedUris = Object.values(selectedBySection).flat();

  if (selectedUris.length === 0) return;

  await CameraRoll.deletePhotos(selectedUris);

  dispatch(removePhotosByUri(selectedUris));

  dispatch(clearSelection());
});
