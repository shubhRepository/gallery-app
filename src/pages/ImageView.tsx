import Carousel from 'react-native-reanimated-carousel';
import { Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { useState } from 'react';
import ImageViewHeader from '../components/imageView/ImageViewHeader';

export type ImageViewRouteProp = RouteProp<RootStackParamList, 'ImageView'>;
const { width, height } = Dimensions.get('window');

export default function ImageView({ route }: { route: ImageViewRouteProp }) {
  const { index, photos } = route.params;
  const navigation = useNavigation();

  const [showUI, setShowUI] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(index);

  return (
    <SafeAreaView style={styles.main}>
      <ImageViewHeader
        photo={photos[currentIndex]}
        visible={showUI}
        onBack={() => navigation.goBack()}
      />
      <Carousel
        width={width}
        height={height}
        data={photos}
        defaultIndex={index}
        loop={false}
        onSnapToItem={i => setCurrentIndex(i)}
        renderItem={({ item }) => (
          <Pressable
            style={styles.imageContainer}
            onPress={() => setShowUI(v => !v)}
          >
            <Image
              source={{ uri: item.node.image.uri }}
              style={styles.image}
              resizeMode="contain"
            />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#080a05',
  },
  imageContainer: { flex: 1 },
  image: {
    flex: 1,
    width,
    height,
  },
});
