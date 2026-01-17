import { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { useGroupByMonthPhotos } from '../hooks/useGroupByMonthPhotos';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PhotosScreen } from '../components/common/PhotosScreen';

type MonthViewRouteProp = RouteProp<RootStackParamList, 'MonthView'>;

export type MonthViewNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MonthView'
>;

export default function MonthView({ route }: { route: MonthViewRouteProp }) {
  const { date } = route.params;
  const photosByMonth = useGroupByMonthPhotos();
  const [monthPhotos, setMonthPhotos] = useState<PhotoIdentifier[]>([]);

  useEffect(() => {
    const found = photosByMonth.find(obj => obj.title === date);
    setMonthPhotos(found?.data || []);
  }, [photosByMonth, date]);

  return <PhotosScreen title={date} photos={monthPhotos} />;
}
