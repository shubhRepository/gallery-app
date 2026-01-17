import { SectionList, Text, StyleSheet } from 'react-native';
import { HomeNavigationProp } from '../../pages/Home';
import RenderImages from './RenderImages';
import {
  useGroupByMonthPhotos,
  useMapIndexByUri,
} from '../../hooks/useGroupByMonthPhotos';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { useState } from 'react';
import ImageActionModal from '../../modals/ImageActionModal';
import {
  enterSelectionMode,
  exitSelectionMode,
} from '../../store/photoActions';
import { deleteSelectedPhotos } from '../../thunks/photoThunks';
import { shareMultipleImages } from '../../helper/shareImage';

export default function PhotoView({
  navigation,
}: {
  navigation: HomeNavigationProp;
}) {
  const dispatch = useAppDispatch();
  const [showImageActionModal, setShowImageActionModal] =
    useState<boolean>(false);
  const selectedUris = useAppSelector(state => state.photoActions.selectedUris);
  const photos = useAppSelector(state => state.photos.photos);
  const photosByMonth = useGroupByMonthPhotos();
  const mapIndexByUri = useMapIndexByUri(photos);

  const handleImageClick = (uri: string) => {
    const index = mapIndexByUri.get(uri) || 0;
    navigation.navigate('ImageView', {
      index,
      photos,
    });
  };

  const handleCloseModal = () => {
    setShowImageActionModal(false);
    dispatch(exitSelectionMode());
  };

  const handleLongImageClick = (uri: string) => {
    setShowImageActionModal(true);
    const scopeUris = photos.map(photo => photo.node.image.uri);
    dispatch(enterSelectionMode({ scopeUris, uri }));
  };

  const handleShareImages = () => {
    shareMultipleImages(selectedUris);
    handleCloseModal();
  };

  const handleDeleteImages = () => {
    dispatch(deleteSelectedPhotos());
    handleCloseModal();
  };

  const handleMoreClick = (date: string) => {
    navigation.navigate('MonthView', { date });
  };

  return (
    <>
      {photosByMonth.length > 0 && (
        <SectionList
          sections={photosByMonth}
          keyExtractor={item => item.node.image.uri}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionTitle}>
              {section.title} ({section.data.length})
            </Text>
          )}
          renderItem={({ section, index }) => (
            <RenderImages
              index={index}
              sectionData={section}
              onImageClick={handleImageClick}
              onMoreClick={handleMoreClick}
              onLongImageClick={handleLongImageClick}
            />
          )}
          stickySectionHeadersEnabled
        />
      )}
      <ImageActionModal
        visible={showImageActionModal}
        onClose={handleCloseModal}
        onShare={handleShareImages}
        onDelete={handleDeleteImages}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    padding: 12,
    fontSize: 20,
    fontWeight: '800',
    backgroundColor: '#080a05',
    color: '#fff',
  },
});
