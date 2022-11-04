import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { RootStackParamList } from '../../interfaces/navigation';
import { ROUTES } from '../../constants/routes';
import MyProfile from '../MyProfile';
import Notification from '../Notification';
import HomeScreen from '../Home';
import PassengerTripGuide from '../PassengerTripGuide';
import DriverTrip from '../DriverTrip';

const Tab = createBottomTabNavigator<RootStackParamList>();
const HomeTripsStack = createStackNavigator<RootStackParamList>();
type Props = NativeStackScreenProps<
  RootStackParamList,
  ROUTES.HOME_TRIPS_STACK_SCREEN
>;

const HomeTripsStackScreen = ({ navigation }: Props) => (
  <HomeTripsStack.Navigator initialRouteName={ROUTES.HOME_SCREEN}
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      detachPreviousScreen: true,
      presentation: 'transparentModal',
    }}>
    <HomeTripsStack.Screen name={ROUTES.HOME_SCREEN} component={HomeScreen} />
    <HomeTripsStack.Screen name={ROUTES.DRIVER_TRIP} component={DriverTrip} />
    <HomeTripsStack.Screen
      name={ROUTES.PASSENGER_TRIP_GUIDE}
      component={PassengerTripGuide}
    />
  </HomeTripsStack.Navigator>
);


function MainTab() {
    return (
        <Tab.Navigator
          initialRouteName={ROUTES.HOME_TRIPS_STACK_SCREEN}
          screenOptions={{
            tabBarActiveTintColor: '#e91e63',
          }}
        >
          <Tab.Screen
            name={ROUTES.HOME_TRIPS_STACK_SCREEN}
            component={HomeTripsStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name={ROUTES.NOTIFICATIONS_SCREEN}
            component={Notification}
            options={{
              tabBarLabel: 'Updates',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="bell" color={color} size={size} />
              ),
              tabBarBadge: 3,
            }}
          />
          <Tab.Screen
            name={ROUTES.MY_PROFILE_SCREEN}
            component={MyProfile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      );
}

export default MainTab;