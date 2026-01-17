import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

export interface CameraRollImage {
  uri: string;
  width: number;
  height: number;
  filename?: string;
}

export interface CameraRollNode {
  image: CameraRollImage;
  timestamp: number;
}

export interface MonthSection {
  title: string;
  data: PhotoIdentifier[];
}
