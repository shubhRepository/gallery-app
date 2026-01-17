import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLUMNS, SIZE } from '../../constants/constants';
import { MonthSection } from '../../types/Photos';
import MorePhotosTile from './MorePhotosTile';

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
  if (index % COLUMNS !== 0 || index >= COLUMNS * 2) return null;

  const date = sectionData.title;
  const rowItems = sectionData.data.slice(index, index + COLUMNS);
  const rowItemsLen = rowItems.length;

  return (
    <View style={styles.imageContainer}>
      {rowItems.map((item, rowIndex) => {
        const isLastItem = rowIndex + 1 === rowItemsLen;
        const isSecondRow = COLUMNS === index;
        const hasMorePhotos = sectionData.data.length > COLUMNS * 2;
        if (isLastItem && isSecondRow && hasMorePhotos) {
          const remainingPhotos = sectionData.data.length - COLUMNS * 2 + 1;
          return (
            <MorePhotosTile
              key={item.node.image.uri}
              uri={item.node.image.uri}
              date={date}
              count={remainingPhotos}
              onClick={onMoreClick}
              size={SIZE}
            />
          );
        }
        return (
          <TouchableOpacity
            onPress={() => onImageClick(item.node.image.uri)}
            onLongPress={() => onLongImageClick(item.node.image.uri)}
            key={item.node.image.uri}
          >
            <Image
              source={{ uri: item.node.image.uri }}
              style={styles.image}
              resizeMode="cover"
            />
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
});
