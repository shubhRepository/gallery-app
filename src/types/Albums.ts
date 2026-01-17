import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

export type AlbumWithCover = {
  id: string;
  title: string;
  count: number;
  coverUri?: string;
  source: string;
};

export type AppAlbum = {
  id: string;
  name: string;
  photos: PhotoIdentifier[];
  count: number;
};
