import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { SIZE } from '../../constants/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import {
  enterSelectionMode,
  exitSelectionMode,
  toggleSelectUri,
} from '../../store/photoActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function RenderAllImages({
  photos,
  onImageClick,
}: {
  photos: PhotoIdentifier[];
  onImageClick?: (uri: string) => void;
}) {
  const isSelectionMode = useAppSelector(
    state => state.photoActions.isSelectionMode,
  );
  const lockSelectionMode = useAppSelector(
    state => state.photoActions.lockSelectionMode,
  );
  const selectedUris = useAppSelector(state => state.photoActions.selectedUris);
  const dispatch = useAppDispatch();

  const handlePress = (uri: string) => {
    if (isSelectionMode) {
      dispatch(toggleSelectUri(uri));
    } else if (onImageClick) {
      onImageClick(uri);
    }
  };

  const handleLongPress = (uri: string) => {
    if (isSelectionMode) return;
    const scopeUris = photos.map(photo => photo.node.image.uri);
    dispatch(enterSelectionMode({ scopeUris, uri }));
  };

  useEffect(() => {
    if (isSelectionMode && selectedUris.length === 0 && !lockSelectionMode) {
      dispatch(exitSelectionMode());
    }
  }, [isSelectionMode, selectedUris, dispatch, lockSelectionMode]);

  return (
    <ScrollView
      style={{ marginBottom: 12 }}
      contentContainerStyle={styles.imageContainer}
    >
      {photos.map(item => {
        const uri = item.node.image.uri;
        const isSelected = selectedUris.includes(uri);

        return (
          <TouchableOpacity
            key={uri}
            onPress={() => handlePress(uri)}
            onLongPress={() => handleLongPress(uri)}
            activeOpacity={0.8}
          >
            <View>
              <Image source={{ uri }} style={styles.image} resizeMode="cover" />

              {isSelectionMode && (
                <View style={styles.overlay}>
                  {isSelected ? (
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
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 16,
  },
  image: {
    width: SIZE,
    height: SIZE,
    borderRadius: 4,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    padding: 6,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
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
