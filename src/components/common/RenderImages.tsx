import { useMemo } from 'react';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { enterSelectionMode } from '../../store/sectionActions';
import RenderLimitedImages from './RenderLimitedImages';
import { useMapIndexByUri } from '../../hooks/useGroupByMonthPhotos';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProp } from '../../pages/Home';
import RenderAllImages from './RenderAllImages';
import RenderSectionImages from './RenderSectionImages';

export default function RenderImages({
  date,
  photos,
  limitImages = 0,
}: {
  date: string;
  photos: PhotoIdentifier[];
  limitImages?: number;
}) {
  const isSelectionMode = useAppSelector(
    state => state.sectionActions.isSelectionMode,
  );
  const dispatch = useAppDispatch();

  const mapIndexByUri = useMapIndexByUri(photos);

  const navigation = useNavigation<HomeNavigationProp>();

  const limitedImageUris = useMemo(() => {
    if (limitImages === 0) return photos.map(photo => photo.node.image.uri);
    return photos.slice(0, limitImages).map(photo => photo.node.image.uri);
  }, [photos, limitImages]);

  const remainingImages = photos.length - limitImages;

  const handleImageClick = (uri: string) => {
    const index = mapIndexByUri.get(uri) || 0;
    navigation.navigate('ImageView', {
      index,
      photos,
    });
  };

  const handleMoreClick = (selectedDate: string) => {
    navigation.navigate('MonthView', { date: selectedDate });
  };

  const handleLongImagePress = (uri: string) => {
    dispatch(enterSelectionMode({ sectionKey: date, uri }));
  };

  return (
    <>
      {!isSelectionMode ? (
        <RenderLimitedImages
          date={date}
          imageUris={limitedImageUris}
          remainingImages={remainingImages}
          onImageClick={handleImageClick}
          onMoreClick={handleMoreClick}
          onLongPress={handleLongImagePress}
        />
      ) : (
        <RenderSectionImages photos={photos} date={date} />
      )}
    </>
  );
}
