import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function MorePhotosTile({
  uri,
  count,
  size,
  date,
  onClick,
}: {
  uri: string;
  count: number;
  size: number;
  date: string;
  onClick: (date: string) => void;
}) {
  return (
    <TouchableOpacity onPress={() => onClick(date)}>
      <View style={[{ width: size, height: size }, styles.blurContainer]}>
        <Image
          source={{ uri }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />

        <LinearGradient
          pointerEvents="none"
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.textWrapper}>
          <Text style={styles.text}>+{count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  textWrapper: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
});
