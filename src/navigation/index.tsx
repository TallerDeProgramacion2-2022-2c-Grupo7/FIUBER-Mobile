import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { ROUTES } from '../constants/routes';
import { RootStackParamList } from '../interfaces/navigation';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import PhoneVerification from '../screens/PhoneVerification';
import SetProfile from '../screens/SetProfile';
import SetDriverProfile from '../screens/SetProfile/driver';
import SignUpScreen from '../screens/SignUp';
import Welcome from '../screens/Welcome';

const Navigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const initialRoute = ROUTES.PHONE_VERIFICATION_SCREEN;

  const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: 'transparent' },
      }}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          detachPreviousScreen: true,
          presentation: 'transparentModal',
        }}>
        <Stack.Screen name={ROUTES.WELCOME} component={Welcome} />
        <Stack.Screen name={ROUTES.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={ROUTES.SIGNUP_SCREEN} component={SignUpScreen} />
        <Stack.Screen name={ROUTES.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen name={ROUTES.SET_PROFILE_SCREEN} component={SetProfile} />
        <Stack.Screen
          name={ROUTES.SET_DRIVER_PROFILE_SCREEN}
          component={SetDriverProfile}
        />
        <Stack.Screen
          name={ROUTES.PHONE_VERIFICATION_SCREEN}
          component={PhoneVerification}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
