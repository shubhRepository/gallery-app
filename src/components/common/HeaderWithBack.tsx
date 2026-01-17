import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { toggleSelectAll } from '../../store/photoActions';
import { useDeleteConfirmation } from '../../hooks/useConfirmDelete';
import { deleteSelectedPhotos } from '../../thunks/photoThunks';

export function HeaderWithBack({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  const dispatch = useAppDispatch();
  const isSelectionMode = useAppSelector(
    state => state.photoActions.isSelectionMode,
  );
  const selectedUris = useAppSelector(state => state.photoActions.selectedUris);
  const scopeUris = useAppSelector(state => state.photoActions.scopeUris);
  const deleteConfirmationAlert = useDeleteConfirmation();
  const isAllSelected =
    selectedUris.length > 0 && selectedUris.length === scopeUris.length;

  const handleSelectAll = () => {
    dispatch(toggleSelectAll());
  };

  const handleDelete = () => {
    dispatch(deleteSelectedPhotos());
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Pressable onPress={onBack}>
          <AntDesign name="arrowleft" color="#fff" size={24} />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
      </View>
      {isSelectionMode && (
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleSelectAll}>
            {isAllSelected ? (
              <View style={styles.checkCircle}>
                <AntDesign name="check" size={14} color="#fff" />
              </View>
            ) : (
              <MaterialIcons
                name="radio-button-unchecked"
                color="#fff"
                size={24}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteConfirmationAlert(handleDelete)}
          >
            <AntDesign name="delete" color="#fff" size={24} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#99ae54',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
