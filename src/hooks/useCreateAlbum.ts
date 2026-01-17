import { AlbumWithCover } from './../types/Albums';
// import { generateUUID } from '../helper/generateUUID';
// import { saveAlbums } from '../storage/albums';
import { useAppSelector } from './useStoreHooks';
import { loadAlbumPhotos } from '../helper/albums';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

// export const createAppAlbum = async ({
//   albumName,
//   selectedUris,
//   photos,
// }: {
//   albumName: string;
//   selectedUris: string[];
//   photos: PhotoIdentifier[];
// }) => {
//   const selectedUriSet = new Set(selectedUris);

//   const selectedPhotos = photos.filter(photo =>
//     selectedUriSet.has(photo.node.image.uri),
//   );
//   const appAlbum = {
//     id: generateUUID(),
//     name: albumName,
//     photos: selectedPhotos,
//     count: selectedPhotos.length,
//   };
//   await saveAlbums([appAlbum]);
// };

// export const useCreateAlbum = () => {
//   const photos = useAppSelector(state => state.photos.photos);
//   const selectedUris = useAppSelector(state => state.photoActions.selectedUris);

//   return createAppAlbum;
// };

export const useLoadAlbumPhotos = () => {
  const appAlbums = useAppSelector(state => state.appAlbums.appAlbums);

  const loadPhotos = async ({
    album,
  }: {
    album: AlbumWithCover;
  }): Promise<PhotoIdentifier[]> => {
    if (album.source === 'app') {
      const appAlbum = appAlbums.find(a => a.id === album.id);
      return appAlbum?.photos ?? [];
    }
    return await loadAlbumPhotos({ name: album.title });
  };

  return loadPhotos;
};
