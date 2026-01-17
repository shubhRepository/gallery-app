import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RenderAllImages from '../components/common/RenderAllImages';
import { useAppDispatch, useAppSelector } from '../hooks/useStoreHooks';
import { useEffect } from 'react';
import { enterSelectionMode, removeAllUris } from '../store/photoActions';

export default function AddPhotosModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(state => state.photos.photos);
  const selectedUris = useAppSelector(state => state.photoActions.selectedUris);
  const isAnyPhotoSelected = selectedUris.length > 0;

  const handleClose = () => {
    dispatch(removeAllUris());
    onClose();
  };

  useEffect(() => {
    const scopeUris = photos.map(photo => photo.node.image.uri);
    dispatch(enterSelectionMode({ scopeUris, lockSelectionMode: true }));
  }, [dispatch, photos]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <ModalHeader
            disabled={!isAnyPhotoSelected}
            onClose={handleClose}
            onAddPhoto={() => onClose()}
          />
          <RenderAllImages photos={photos} />
        </View>
      </View>
    </Modal>
  );
}

function ModalHeader({
  disabled,
  onClose,
  onAddPhoto,
}: {
  disabled: boolean;
  onClose: () => void;
  onAddPhoto: () => void;
}) {
  return (
    <View style={styles.modalHeader}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <AntDesign name="close" color="#fff" size={24} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Add Photos</Text>

      <TouchableOpacity
        style={[styles.createButton, disabled && styles.disable]}
        disabled={disabled}
        onPress={onAddPhoto}
      >
        <AntDesign name="check" color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '80%',
    backgroundColor: '#353630',
    borderRadius: 50,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    gap: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#4A4B45',
    padding: 14,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#99ae54',
    borderRadius: 50,
  },
  create: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  albumInput: {
    backgroundColor: '#4A4B45',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 50,
    color: 'white',
    fontSize: 16,
  },
  photos: {
    flexDirection: 'row',
    gap: 10,
  },
  addPhoto: {
    padding: 28,
    backgroundColor: '#4A4B45',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disable: {
    backgroundColor: '#4A4B45',
  },
});
