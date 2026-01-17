import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import { AlbumWithCover, AppAlbum } from '../types/Albums';

export const loadAlbumsWithCovers = async (): Promise<AlbumWithCover[]> => {
  const albums = await CameraRoll.getAlbums({
    assetType: 'Photos',
  });

  const systemAlbums: AlbumWithCover[] = await Promise.all(
    albums.map(async album => {
      const res = await CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
        groupName: album.title,
      });

      const edges = res.edges;
      const coverUri =
        edges.length > 0
          ? edges[Math.floor(edges.length / 2)].node.image.uri
          : undefined;

      return {
        id: album.id,
        title: album.title,
        count: album.count,
        coverUri,
        source: 'system',
      };
    }),
  );

  return systemAlbums;
};

export const loadAlbumPhotos = async ({
  name,
}: {
  name: string;
}): Promise<PhotoIdentifier[]> => {
  let photos: PhotoIdentifier[] = [];
  const res = await CameraRoll.getPhotos({
    first: 20,
    assetType: 'Photos',
    groupName: name,
  });
  photos = res.edges;
  return photos;
};

export function formatToAlbumwithCover(
  localAlbums: AppAlbum[],
): AlbumWithCover[] {
  return localAlbums.map(album => {
    return {
      id: album.id,
      title: album.name,
      coverUri: album.photos[0]?.node.image.uri,
      count: album.count,
      source: 'app',
    };
  });
}
