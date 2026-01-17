import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { HomeNavigationProp } from '../../pages/Home';
import { useEffect, useState } from 'react';
import {
  formatToAlbumwithCover,
  loadAlbumsWithCovers,
} from '../../helper/albums';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { setAlbums } from '../../store/albums';
import { BlurView } from '@react-native-community/blur';
import { AlbumWithCover } from '../../types/Albums';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CreateAlbumModal from '../../modals/CreateAlbumModal';

const { width } = Dimensions.get('window');
const GAP = 16;
const CARD_SIZE = (width - GAP * 3) / 2;

export default function AlbumView({
  navigation,
}: {
  navigation: HomeNavigationProp;
}) {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(state => state.albums.albums);
  const localAppAlbums = useAppSelector(state => state.appAlbums.appAlbums);
  const [showCreateAlbumModal, setShowCreateAlbumModal] =
    useState<boolean>(false);

  const handleAlbumClick = (album: AlbumWithCover) => {
    navigation.navigate('AlbumPhotos', {
      album,
    });
  };

  useEffect(() => {
    (async () => {
      const albumsWithCovers = await loadAlbumsWithCovers();
      const localAlbums = formatToAlbumwithCover(localAppAlbums);
      dispatch(setAlbums([...albumsWithCovers, ...localAlbums]));
    })();
  }, [dispatch, localAppAlbums]);

  return (
    <ScrollView
      style={{ marginBottom: 12 }}
      contentContainerStyle={styles.grid}
    >
      {albums.map(album => (
        <Pressable key={album.id} onPress={() => handleAlbumClick(album)}>
          <View style={[styles.card]}>
            {album.coverUri ? (
              <Image
                source={{ uri: album.coverUri }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholder} />
            )}

            <BlurView
              pointerEvents="none"
              style={styles.blur}
              blurType="dark"
              blurAmount={1}
              reducedTransparencyFallbackColor="black"
            />

            <View style={styles.textContainer} pointerEvents="none">
              <Text style={styles.title}>{album.title}</Text>
              <Text style={styles.count}>
                {album.count} Photo{album.count > 1 && 's'}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
      <TouchableOpacity
        style={styles.addAlbum}
        onPress={() => setShowCreateAlbumModal(true)}
      >
        <AntDesign name="plus" color="#fff" size={32} />
      </TouchableOpacity>
      <CreateAlbumModal
        visible={showCreateAlbumModal}
        onClose={() => setShowCreateAlbumModal(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    flex: 1,
  },

  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1c1c1e',
  },

  blur: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
  },

  placeholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2c2c2e',
  },

  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  count: {
    color: '#d1d1d6',
    fontSize: 12,
    marginTop: 2,
  },
  addAlbum: {
    position: 'absolute',
    backgroundColor: '#353630',
    padding: 20,
    borderRadius: 50,
    bottom: 0,
    right: 20,
  },
});
