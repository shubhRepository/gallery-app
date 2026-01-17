import { useMemo } from 'react';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import dayjs from 'dayjs';
import { MonthSection } from '../types/Photos';
import { useAppSelector } from './useStoreHooks';

export function groupPhotosByMonth(photos: PhotoIdentifier[]): MonthSection[] {
  const map = new Map<string, PhotoIdentifier[]>();

  for (const photo of photos) {
    const date = dayjs(photo.node.timestamp * 1000);
    const key = date.format('MMMM YYYY');

    const existing = map.get(key);
    if (existing) {
      existing.push(photo);
    } else {
      map.set(key, [photo]);
    }
  }

  return Array.from(map.entries()).map(([title, data]) => ({
    title,
    data,
  }));
}

export const useGroupByMonthPhotos = (): MonthSection[] => {
  const photos = useAppSelector(state => state.photos.photos);
  return useMemo(() => groupPhotosByMonth(photos), [photos]);
};

export const useMapIndexByUri = (photos: PhotoIdentifier[]) => {
  return useMemo(() => {
    const map = new Map<string, number>();
    photos.forEach((photo, index) => {
      map.set(photo.node.image.uri, index);
    });
    return map;
  }, [photos]);
};
