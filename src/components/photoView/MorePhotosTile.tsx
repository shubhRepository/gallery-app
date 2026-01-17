import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from '@react-native-community/blur';

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

        <BlurView
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={1}
          reducedTransparencyFallbackColor="black"
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
