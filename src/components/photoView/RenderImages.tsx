import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLUMNS, SIZE } from '../../constants/constants';
import { MonthSection } from '../../types/Photos';
import MorePhotosTile from './MorePhotosTile';
import { useAppSelector } from '../../hooks/useStoreHooks';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function RenderImages({
  index,
  sectionData,
  onImageClick,
  onMoreClick,
  onLongImageClick,
}: {
  index: number;
  sectionData: MonthSection;
  onImageClick: (index: string) => void;
  onMoreClick: (date: string) => void;
  onLongImageClick: (index: string) => void;
}) {
  const isSelectionMode = useAppSelector(
    state => state.photoActions.isSelectionMode,
  );
  const selectedUris = useAppSelector(state => state.photoActions.selectedUris);

  if ((!isSelectionMode && index % COLUMNS !== 0) || index >= COLUMNS * 2)
    return null;

  const date = sectionData.title;
  const rowItems = sectionData.data.slice(index, index + COLUMNS);
  const rowItemsLen = rowItems.length;

  return (
    <View style={styles.imageContainer}>
      {rowItems.map((item, rowIndex) => {
        const uri = item.node.image.uri;
        let isSelected = false;

        if (!isSelectionMode) {
          const isLastItem = rowIndex + 1 === rowItemsLen;
          const isSecondRow = COLUMNS === index;
          const hasMorePhotos = sectionData.data.length > COLUMNS * 2;
          if (isLastItem && isSecondRow && hasMorePhotos) {
            const remainingPhotos = sectionData.data.length - COLUMNS * 2 + 1;
            return (
              <MorePhotosTile
                key={uri}
                uri={uri}
                date={date}
                count={remainingPhotos}
                onClick={onMoreClick}
                size={SIZE}
              />
            );
          }
        } else {
          isSelected = selectedUris.includes(uri);
        }
        return (
          <TouchableOpacity
            onPress={() => onImageClick(uri)}
            onLongPress={() => onLongImageClick(uri)}
            key={uri}
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
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 12,
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
