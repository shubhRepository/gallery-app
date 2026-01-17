import { View, Text, Pressable, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ImageViewHeader({
  photo,
  onBack,
  visible,
}: {
  photo: PhotoIdentifier;
  onBack: () => void;
  visible: boolean;
}) {
  if (!visible) return null;

  const date = dayjs(photo.node.timestamp * 1000).format('DD MMM');
  const time = dayjs(photo.node.timestamp * 1000).format('HH:mm');

  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={onBack}>
        <AntDesign name="arrowleft" color="#fff" size={24} />
      </Pressable>

      <View>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 10,
    flexDirection: 'row',
    gap: 8,
  },
  date: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  time: {
    color: 'white',
    fontSize: 14,
  },
});
