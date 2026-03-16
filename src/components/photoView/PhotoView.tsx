import { SectionList, Text, StyleSheet, View, FlatList } from 'react-native';
import { HomeNavigationProp } from '../../pages/Home';
import {
  useGroupByMonthPhotos,
  useMapIndexByUri,
} from '../../hooks/useGroupByMonthPhotos';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { enterSelectionMode } from '../../store/photoActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LIMIT_IMAGES } from '../../constants/constants';
import RenderImages from '../common/RenderImages';

export default function PhotoView() {
  // const [showImageActionModal, setShowImageActionModal] =
  //   useState<boolean>(false);
  // const selectedUris = useAppSelector(state => state.photoActions.selectedUris);
  const isSelectionMode = useAppSelector(
    state => state.photoActions.isSelectionMode,
  );
  const photosByMonth = useGroupByMonthPhotos();

  // const handleImageClick = (uri: string) => {
  //   const index = mapIndexByUri.get(uri) || 0;
  //   navigation.navigate('ImageView', {
  //     index,
  //     photos,
  //   });
  // };

  // const handleCloseModal = () => {
  //   setShowImageActionModal(false);
  //   dispatch(exitSelectionMode());
  // };

  // const handleLongImageClick = (uri: string) => {
  //   // setShowImageActionModal(true);
  //   const scopeUris = photos.map(photo => photo.node.image.uri);
  //   dispatch(enterSelectionMode({ scopeUris, uri }));
  // };

  // const handleShareImages = () => {
  //   shareMultipleImages(selectedUris);
  //   handleCloseModal();
  // };

  // const handleDeleteImages = () => {
  //   dispatch(deleteSelectedPhotos());
  //   handleCloseModal();
  // };

  return (
    <>
      {photosByMonth.length > 0 && (
        <FlatList
          data={photosByMonth}
          keyExtractor={item => item.title}
          renderItem={({ item, index }) => (
            <View>
              {/* Section Header */}
              <View style={styles.headerContainer}>
                <Text style={styles.sectionTitle}>
                  {item.title} ({item.data.length})
                </Text>
              </View>

              <RenderImages
                date={item.title}
                photos={item.data}
                limitImages={LIMIT_IMAGES}
              />
            </View>
          )}
        />
      )}
      {/* <ImageActionModal
        visible={showImageActionModal}
        onClose={handleCloseModal}
        onShare={handleShareImages}
        onDelete={handleDeleteImages}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#080a05',
    paddingRight: 18,
  },
  sectionTitle: {
    padding: 12,
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
});
