import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { useEffect, useState } from 'react';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { PhotosScreen } from '../components/common/PhotosScreen';
import { useLoadAlbumPhotos } from '../hooks/useCreateAlbum';

type AlbumPhotosRouteProp = RouteProp<RootStackParamList, 'AlbumPhotos'>;

export default function AlbumPhotosView({
  route,
}: {
  route: AlbumPhotosRouteProp;
}) {
  const { album } = route.params;
  const loadAlbumPhotos = useLoadAlbumPhotos();
  const [albumPhotos, setAlbumPhotos] = useState<PhotoIdentifier[]>([]);

  useEffect(() => {
    (async () => {
      const photos = await loadAlbumPhotos({ album });
      setAlbumPhotos(photos);
    })();
  }, [album, loadAlbumPhotos]);

  return <PhotosScreen title={album.title} photos={albumPhotos} />;
}
