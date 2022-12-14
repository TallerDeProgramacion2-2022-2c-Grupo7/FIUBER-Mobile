import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ROUTES } from '../constants/routes';
import { RootStackParamList } from '../interfaces/navigation';
import { ReduxState } from '../interfaces/redux';
import LoginScreen from '../screens/Login';
import MainTab from '../screens/MainTab';
import PhoneVerification from '../screens/PhoneVerification';
import SetProfile from '../screens/SetProfile';
import SetDriverProfile from '../screens/SetProfile/driver';
import SignUpScreen from '../screens/SignUp';
import Wallet from '../screens/Wallet';
import Welcome from '../screens/Welcome';

const Navigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification FCM caused app to open from background state:',
        remoteMessage.notification
      );
      navigationRef.navigate(ROUTES.TAB_SCREEN);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          navigationRef.navigate(ROUTES.TAB_SCREEN);
        }
      });
  }, []);

  const initialRoute = auth().currentUser ? ROUTES.TAB_SCREEN : ROUTES.WELCOME;

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
        <Stack.Screen name={ROUTES.TAB_SCREEN} component={MainTab} />
        <Stack.Screen name={ROUTES.SET_PROFILE_SCREEN} component={SetProfile} />
        <Stack.Screen
          name={ROUTES.SET_DRIVER_PROFILE_SCREEN}
          component={SetDriverProfile}
        />
        <Stack.Screen
          name={ROUTES.PHONE_VERIFICATION_SCREEN}
          component={PhoneVerification}
        />
        <Stack.Screen name={ROUTES.WALLET} component={Wallet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
