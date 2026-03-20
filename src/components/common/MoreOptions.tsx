import Feather from 'react-native-vector-icons/Feather';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ImageActionModal from '../../modals/ImageActionModal';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { shareMultipleImages } from '../../helper/shareImage';
import { deleteSelectedPhotos } from '../../thunks/photoThunks';
import { clearSelection } from '../../store/sectionActions';

export default function MoreOptions({ show }: { show: boolean }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const selectedBySection = useAppSelector(
    state => state.sectionActions.selectedBySection,
  );

  const handleShare = () => {
    const selectedUris = Object.values(selectedBySection).flat();
    shareMultipleImages(selectedUris);
    setIsModalVisible(false);
    dispatch(clearSelection());
  };

  const handleDelete = () => {
    dispatch(deleteSelectedPhotos());
    setIsModalVisible(false);
  };

  return (
    <>
      {show && (
        <TouchableOpacity
          style={styles.moreBtn}
          onPress={() => setIsModalVisible(true)}
        >
          <Feather name="more-vertical" color="#fff" size={24} />
        </TouchableOpacity>
      )}
      <ImageActionModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onShare={handleShare}
        onDelete={handleDelete}
      />
    </>
  );
}

const styles = StyleSheet.create({
  moreBtn: {
    position: 'absolute',
    backgroundColor: '#353630',
    padding: 24,
    borderRadius: 50,
    bottom: 62,
    right: 34,
  },
});
