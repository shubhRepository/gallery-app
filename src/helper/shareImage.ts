import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Platform } from 'react-native';

const wait = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

export const shareMultipleImages = async (uris: string[]) => {
  try {
    const fileUrls: string[] = [];

    for (const uri of uris) {
      const filename = `share-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.jpg`;

      const destPath = `${RNFS.CachesDirectoryPath}/${filename}`;

      if (Platform.OS === 'ios' && uri.startsWith('ph://')) {
        await RNFS.copyAssetsFileIOS(uri, destPath, 0, 0);
      } else {
        await RNFS.copyFile(uri, destPath);
      }

      fileUrls.push(`file://${destPath}`);
    }

    if (Platform.OS === 'ios') {
      await wait(100);
    }

    await Share.open({
      urls: fileUrls,
      type: 'image/jpeg',
      failOnCancel: false,
    });
  } catch (error) {
    console.error('Failed to share images:', error);
  }
};
