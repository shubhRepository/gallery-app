import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './src/pages/Home';
import ImageView from './src/pages/ImageView';
import { RootStackParamList } from './src/types/RootStackParamList';
import MonthView from './src/pages/MonthView';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AlbumPhotosView from './src/pages/AlbumPhotosView';

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ImageView"
                component={ImageView}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MonthView"
                component={MonthView}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AlbumPhotos"
                component={AlbumPhotosView}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
