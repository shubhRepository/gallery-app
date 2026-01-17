import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { AlbumWithCover } from './Albums';

export type RootStackParamList = {
  Home: undefined;
  ImageView: {
    index: number;
    photos: PhotoIdentifier[];
  };
  MonthView: {
    date: string;
  };
  AlbumPhotos: {
    album: AlbumWithCover;
  };
};
