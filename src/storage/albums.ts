import { ALBUMS_KEY } from '../constants/constants';
import { AppAlbum } from '../types/Albums';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadAlbums = async (): Promise<AppAlbum[]> => {
  const raw = await AsyncStorage.getItem(ALBUMS_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveAlbums = async (albums: AppAlbum[]) => {
  await AsyncStorage.setItem(ALBUMS_KEY, JSON.stringify(albums));
};
