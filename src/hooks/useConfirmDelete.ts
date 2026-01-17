import { Alert } from 'react-native';
import { useAppSelector } from './useStoreHooks';

export const useDeleteConfirmation = () => {
  const selectedUris = useAppSelector(state => state.photoActions.selectedUris);
  return (onConfirmDelete: () => void) => {
    confirmDelete(selectedUris, onConfirmDelete);
  };
};

const confirmDelete = (selectedUris: string[], onConfirmDelete: () => void) => {
  Alert.alert(
    'Delete Photos',
    `Delete ${selectedUris.length} photo(s)? This action cannot be undone.`,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: onConfirmDelete },
    ],
  );
};
