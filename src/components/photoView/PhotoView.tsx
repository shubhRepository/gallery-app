import { SectionList, Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { HomeNavigationProp } from '../../pages/Home';
import {
  useGroupByMonthPhotos,
  useMapIndexByUri,
} from '../../hooks/useGroupByMonthPhotos';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { enterSelectionMode } from '../../store/photoActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LIMIT_IMAGES } from '../../constants/constants';
import RenderImages from '../common/RenderImages';
import { toggleSectionSelection } from '../../store/sectionActions';

export default function PhotoView() {
  const dispatch = useAppDispatch();
  const selectedBySection = useAppSelector(
    state => state.sectionActions.selectedBySection,
  );
  const isSelectionMode = useAppSelector(
    state => state.sectionActions.isSelectionMode,
  );
  const photosByMonth = useGroupByMonthPhotos();

  return (
    <>
      {photosByMonth.length > 0 && (
        <FlatList
          data={photosByMonth}
          keyExtractor={item => item.title}
          renderItem={({ item, index }) => (
            <View>
              {/* Section Header */}
              <View style={styles.headerContainer}>
                <Text style={styles.sectionTitle}>
                  {item.title} ({item.data.length})
                </Text>
                
                {isSelectionMode && (
                  <TouchableOpacity
                    onPress={() => {
                      const sectionUris = item.data.map(p => p.node.image.uri);
                      dispatch(
                        toggleSectionSelection({
                          sectionKey: item.title,
                          sectionUris,
                        })
                      );
                    }}
                    style={{ padding: 12 }}
                  >
                    {selectedBySection[item.title]?.length === item.data.length ? (
                      <View style={styles.checkCircleLarge}>
                        <AntDesign name="check" size={16} color="#fff" />
                      </View>
                    ) : (
                      <MaterialIcons
                        name="radio-button-unchecked"
                        color="#fff"
                        size={24}
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>

              <RenderImages
                date={item.title}
                photos={item.data}
                limitImages={LIMIT_IMAGES}
              />
            </View>
          )}
        />
      )}
      {/* <ImageActionModal
        visible={showImageActionModal}
        onClose={handleCloseModal}
        onShare={handleShareImages}
        onDelete={handleDeleteImages}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#080a05',
    paddingRight: 18,
  },
  sectionTitle: {
    padding: 12,
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  checkCircleLarge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#99ae54',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
