import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { generateUUID } from '../helper/generateUUID';
import { loadAlbums, saveAlbums } from '../storage/albums';
import { setAppAlbums } from '../store/appAlbum';
import { AppAlbum } from '../types/Albums';

const createAppAlbum = async ({
  albumName,
  selectedUris,
  photos,
  appAlbums,
}: {
  albumName: string;
  selectedUris: string[];
  photos: PhotoIdentifier[];
  appAlbums: AppAlbum[];
}) => {
  const selectedUriSet = new Set(selectedUris);

  const selectedPhotos = photos.filter(photo =>
    selectedUriSet.has(photo.node.image.uri),
  );
  const newAlbum = {
    id: generateUUID(),
    name: albumName,
    photos: selectedPhotos,
    count: selectedPhotos.length,
  };
  await saveAlbums([...appAlbums, newAlbum]);
};

export const createAlbumAndRefresh = createAsyncThunk<
  void,
  { albumName: string },
  { state: RootState }
>('albums/createAndRefresh', async ({ albumName }, { getState, dispatch }) => {
  const state = getState();

  const photos = state.photos.photos;
  const appAlbums = state.appAlbums.appAlbums;
  const selectedUris = state.photoActions.selectedUris;

  await createAppAlbum({ albumName, selectedUris, photos, appAlbums });

  const albums = await loadAlbums();
  dispatch(setAppAlbums(albums));
});
