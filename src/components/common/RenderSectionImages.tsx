import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SIZE } from '../../constants/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootState } from '../../store/store';

export default function RenderSectionImages({
  photos,
  date,
}: {
  photos: PhotoIdentifier[];
  date: string;
}) {
  const isImageSelected = (state: RootState, sectionKey: string, uri: string) =>
    state.sectionActions.selectedBySection[sectionKey]?.includes(uri) ?? false;
  return (
    <FlatList
      data={photos}
      numColumns={4}
      keyExtractor={item => item.node.image.uri}
      contentContainerStyle={styles.imageContainer}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => {
        const uri = item.node.image.uri;
        // const isSelected = selectedUris.includes(uri);

        return (
          <TouchableOpacity
            // onPress={() => handlePress(uri)}
            // onLongPress={() => handleLongPress(uri)}
            activeOpacity={0.8}
          >
            <View>
              <Image source={{ uri }} style={styles.image} resizeMode="cover" />

              {/* {isSelectionMode && (
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
              )} */}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    paddingBottom: 12,
  },

  row: {
    gap: 12,
    marginBottom: 12,
  },

  image: {
    width: SIZE,
    height: SIZE,
    borderRadius: 4,
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 6,
  },

  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#99ae54',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
