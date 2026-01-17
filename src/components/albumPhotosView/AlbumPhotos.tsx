import {
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { COLUMNS } from '../../constants/constants';
import { toggleSelectUri } from '../../store/photoActions';

const SIZE = Dimensions.get('window').width / (COLUMNS + 1);

export default function AlbumPhotos({
  showAddPhotoModal,
}: {
  showAddPhotoModal: () => void;
}) {
  const dispatch = useAppDispatch();
  const photoUris = useAppSelector(state => state.photoActions.selectedUris);

  const handleRemovePhoto = (uri: string) => {
    dispatch(toggleSelectUri(uri));
  };

  return (
    <ScrollView style={styles.photos}>
      <View style={styles.photosContainer}>
        <TouchableOpacity style={styles.addPhoto} onPress={showAddPhotoModal}>
          <AntDesign name="plus" color="#fff" size={48} />
        </TouchableOpacity>
        {photoUris.map(uri => {
          return (
            <View style={styles.imageWrapper} key={uri}>
              <Image source={{ uri }} style={styles.image} resizeMode="cover" />

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => handleRemovePhoto(uri)}
                hitSlop={10}
              >
                <AntDesign name="close" size={12} color="#000" />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  photos: {
    flex: 1,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 12,
  },
  addPhoto: {
    width: SIZE,
    height: SIZE,
    borderRadius: 4,
    backgroundColor: '#4A4B45',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: SIZE,
    height: SIZE,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  closeButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff80',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
