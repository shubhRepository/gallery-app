import { Dimensions } from 'react-native';

export const TABS = {
  PHOTO: 'photo',
  ALBUM: 'album',
};

export const COLUMNS = 4;

export const SIZE = Dimensions.get('window').width / (COLUMNS + 1);

export const UNTITLED = 'untitled';

export const ALBUMS_KEY = 'albums_key';
