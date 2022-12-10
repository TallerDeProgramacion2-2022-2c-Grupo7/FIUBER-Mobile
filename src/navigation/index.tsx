import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Host } from 'react-native-portalize';
import messaging from '@react-native-firebase/messaging';


import { ROUTES } from '../constants/routes';
import { RootStackParamList } from '../interfaces/navigation';
import LoginScreen from '../screens/Login';
import PhoneVerification from '../screens/PhoneVerification';
import SetProfile from '../screens/SetProfile';
import SetDriverProfile from '../screens/SetProfile/driver';
import SignUpScreen from '../screens/SignUp';
import Welcome from '../screens/Welcome';
import MainTab from '../screens/MainTab';

const Navigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const [initialRoute, setInitialRoute] = useState(ROUTES.WELCOME);

  const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification FCM caused app to open from background state:',
        remoteMessage.notification,
      );
      navigationRef.navigate(ROUTES.HOME_SCREEN);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if(remoteMessage){
          setInitialRoute(ROUTES.HOME_SCREEN);
        }
      });
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: 'transparent' },
      }}>
      <Host>
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
          <Stack.Screen
            name={ROUTES.SET_PROFILE_SCREEN}
            component={SetProfile}
          />
          <Stack.Screen
            name={ROUTES.SET_DRIVER_PROFILE_SCREEN}
            component={SetDriverProfile}
          />
          <Stack.Screen
          name={ROUTES.PHONE_VERIFICATION_SCREEN}
          component={PhoneVerification}
          />
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
};

export default Navigator;
