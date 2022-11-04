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
import { StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Config from 'react-native-config';
import Geocoder from 'react-native-geocoding';
import { Provider } from 'react-redux';

import Navigator from './navigation';
import { store } from './redux';

const { MAPS_API_KEY } = Config;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors.transparent,
  };

  Geocoder.init(MAPS_API_KEY);

  return (
    <Provider store={store}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Navigator />
    </Provider>
  );
};

export default App;
