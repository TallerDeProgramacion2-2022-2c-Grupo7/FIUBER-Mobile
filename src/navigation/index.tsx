import {
  NavigationContainer,
  Theme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { ROUTES } from '../constants/routes';
import { Colors } from '../constants/theme';
import { RootStackParamList } from '../interfaces/navigation';
import Default from '../screens/Default';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import Welcome from '../screens/Welcome';

const Navigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const initialRoute = ROUTES.WELCOME;

  const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Colors.White.Primary },
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}>
        <Stack.Screen name={ROUTES.WELCOME} component={Welcome} />
        <Stack.Screen name={ROUTES.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={ROUTES.SIGNUP_SCREEN} component={SignUpScreen} />
        <Stack.Screen name={ROUTES.HOME_SCREEN} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
