/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import './translations';

import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Config from 'react-native-config';
import Geocoder from 'react-native-geocoding';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import Navigator from './navigation';
import { store } from './redux';

const { MAPS_API_KEY } = Config;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors.transparent,
  };

  Geocoder.init(MAPS_API_KEY!);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <GestureHandlerRootView style={styles.container}>
          <Host>
            <Navigator />
          </Host>
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
