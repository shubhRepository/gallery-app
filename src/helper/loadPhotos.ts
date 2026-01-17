import { CameraRoll } from '@react-native-camera-roll/camera-roll';

export async function loadPhotos() {
  const photos = await CameraRoll.getPhotos({
    first: 100,
    assetType: 'Photos',
  });

  return photos.edges;
}
