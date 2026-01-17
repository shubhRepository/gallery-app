import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { HeaderWithBack } from './HeaderWithBack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import { useMapIndexByUri } from '../../hooks/useGroupByMonthPhotos';
import RenderAllImages from './RenderAllImages';
import { useResetSelectionOnBlur } from '../../hooks/useResetSelectionOnBlur';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ImageView'
>;

export function PhotosScreen({
  title,
  photos,
}: {
  title: string;
  photos: PhotoIdentifier[];
}) {
  const navigation = useNavigation<NavigationProp>();
  const mapIndexByUri = useMapIndexByUri(photos);
  useResetSelectionOnBlur();

  const handleImageClick = (uri: string) => {
    const index = mapIndexByUri.get(uri) ?? 0;
    navigation.navigate('ImageView', {
      index,
      photos,
    });
  };

  return (
    <SafeAreaView style={styles.main}>
      <HeaderWithBack title={title} onBack={() => navigation.goBack()} />
      <RenderAllImages photos={photos} onImageClick={handleImageClick} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#080a05',
    padding: 16,
    gap: 16,
  },
});
