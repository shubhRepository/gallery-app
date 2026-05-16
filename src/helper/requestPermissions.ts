import {
  request,
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
} from 'react-native-permissions';
import { Platform } from 'react-native';

export async function requestPhotoPermission() {
  let permission;

  if (Platform.OS === 'ios') {
    permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
  } else {
    if (Number(Platform.Version) >= 33) {
      permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    } else {
      permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    }
  }

  const status = await check(permission);

  switch (status) {
    case RESULTS.UNAVAILABLE:
      return false;

    case RESULTS.DENIED: {
      const result = await request(permission);
      return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
    }

    case RESULTS.LIMITED:
    case RESULTS.GRANTED:
      return true;

    case RESULTS.BLOCKED:
      await openSettings();
      return false;

    default:
      return false;
  }
}
