import { request, PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import { Platform } from 'react-native';

export async function requestPhotoPermission() {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

  const status = await check(permission);

  switch (status) {
    case RESULTS.UNAVAILABLE:
      return false;

    case RESULTS.DENIED:
      const result = await request(permission);
      return result === RESULTS.GRANTED || result === RESULTS.LIMITED;

    case RESULTS.LIMITED:
      return true;

    case RESULTS.GRANTED:
      return true;

    case RESULTS.BLOCKED:
      return false;
    default:
      return false;
  }
}
