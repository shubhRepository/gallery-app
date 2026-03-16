import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Tabs from '../tabs/Tabs';
import { useEffect, useState } from 'react';
import PhotoView from '../components/photoView/PhotoView';
import AlbumView from '../components/albumView/AlbumView';
import { TABS } from '../constants/constants';
import { requestPhotoPermission } from '../helper/requestPermissions';
import { loadPhotos } from '../helper/loadPhotos';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { setPhotos } from '../store/photos';
import { useAppDispatch } from '../hooks/useStoreHooks';
import { loadAlbums } from '../storage/albums';
import { setAppAlbums } from '../store/appAlbum';

export type HomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(TABS.PHOTO);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const granted = await requestPhotoPermission();
      if (!granted) {
        setIsPermissionGranted(false);
        return;
      }
      setIsPermissionGranted(true);
      const images = await loadPhotos();
      dispatch(setPhotos(images));
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const albums = await loadAlbums();
      dispatch(setAppAlbums(albums));
    })();
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Pictoria</Text>
        <Feather name="camera" color="#fff" size={24} />
      </View>
      <Tabs selected={selectedTab} setSelected={setSelectedTab} />
      {isPermissionGranted ? (
        selectedTab === TABS.PHOTO ? (
          <PhotoView />
        ) : (
          <AlbumView />
        )
      ) : (
        <View style={styles.noShowContainer}>
          {selectedTab === TABS.PHOTO && (
            <Text style={styles.noShowText}>No photos to show.</Text>
          )}
          {selectedTab === TABS.ALBUM && (
            <Text style={styles.noShowText}>
              No Albums to show. Click on "+" icon to create.
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#080a05',
    padding: 16,
    gap: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  noShowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noShowText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
});
