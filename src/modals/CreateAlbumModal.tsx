import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddPhotosModal from './AddPhotosModal';
import AlbumPhotos from '../components/albumPhotosView/AlbumPhotos';
import { UNTITLED } from '../constants/constants';
import { useAppDispatch, useAppSelector } from '../hooks/useStoreHooks';
import { exitSelectionMode } from '../store/photoActions';
import { createAlbumAndRefresh } from '../thunks/albumThunks';

export default function CreateAlbumModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [albumName, setAlbumName] = useState<string>('');
  const selectedUris = useAppSelector(state => state.photoActions.selectedUris);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState<boolean>(false);
  const isAnyPhotoSelected = selectedUris.length > 0;

  const handleClose = () => {
    setShowAddPhotoModal(false);
  };

  const handleCreateAlbum = async () => {
    const name = !albumName ? UNTITLED : albumName;

    try {
      await dispatch(createAlbumAndRefresh({ albumName: name })).unwrap();
      dispatch(exitSelectionMode());
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

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
            onClose={onClose}
            onCreate={handleCreateAlbum}
            disabled={!isAnyPhotoSelected}
          />
          <TextInput
            placeholder="Enter album name"
            style={styles.albumInput}
            placeholderTextColor={'#ffffff50'}
            value={albumName}
            onChangeText={setAlbumName}
          />
          <AlbumPhotos showAddPhotoModal={() => setShowAddPhotoModal(true)} />
        </View>
      </View>
      <AddPhotosModal visible={showAddPhotoModal} onClose={handleClose} />
    </Modal>
  );
}

function ModalHeader({
  onClose,
  onCreate,
  disabled,
}: {
  onClose: () => void;
  onCreate: () => void;
  disabled: boolean;
}) {
  return (
    <View style={styles.modalHeader}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <AntDesign name="close" color="#fff" size={24} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Create Album</Text>

      <TouchableOpacity
        style={[styles.createButton, disabled && styles.disable]}
        onPress={onCreate}
        disabled={disabled}
      >
        <Text style={styles.create}>Create</Text>
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
    height: '50%',
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
  disable: {
    backgroundColor: '#4A4B45',
  },
});
