import { StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { SIZE } from '../../constants/constants';
import MorePhotosTile from '../photoView/MorePhotosTile';

export default function RenderLimitedImages({
  date,
  imageUris,
  remainingImages,
  onImageClick,
  onMoreClick,
  onLongPress,
}: {
  date: string;
  imageUris: string[];
  remainingImages: number;
  onImageClick: (uri: string) => void;
  onMoreClick: (date: string) => void;
  onLongPress: (uri: string) => void;
}) {
  return (
    <FlatList
      data={imageUris}
      numColumns={4}
      keyExtractor={(item, index) => `${item}-${index}`}
      columnWrapperStyle={styles.row}
      renderItem={({ _, index }) => {
        return (
          <RenderImage
            date={date}
            uris={imageUris}
            index={index}
            remaining={remainingImages}
            onImageSelect={onImageClick}
            onMoreClick={onMoreClick}
            onLongPress={onLongPress}
          />
        );
      }}
    />
  );
}

function RenderImage({
  date,
  uris,
  index,
  remaining,
  onImageSelect,
  onMoreClick,
  onLongPress,
}: {
  date: string;
  uris: string[];
  index: number;
  remaining: number;
  onImageSelect: (uri: string) => void;
  onMoreClick: (date: string) => void;
  onLongPress: (uri: string) => void;
}) {
  const isLastItem = index + 1 === uris.length;
  if (isLastItem && remaining > 0) {
    return (
      <MorePhotosTile
        key={uris[index]}
        uri={uris[index]}
        date={date}
        count={remaining + 1}
        onClick={onMoreClick}
        size={SIZE}
      />
    );
  }
  return (
    <TouchableOpacity
      onPress={() => onImageSelect(uris[index])}
      onLongPress={() => onLongPress(uris[index])}
    >
      <Image
        source={{ uri: uris[index] }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 12,
    marginBottom: 12,
  },
  image: {
    width: SIZE,
    height: SIZE,
    borderRadius: 4,
  },
});
