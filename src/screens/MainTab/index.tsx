import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { RootStackParamList } from '../../interfaces/navigation';
import { ROUTES } from '../../constants/routes';
import MyProfile from '../MyProfile';
import Notification from '../Notification';
import HomeScreen from '../Home';

const Tab = createBottomTabNavigator<RootStackParamList>();

function MainTab() {
    return (
        <Tab.Navigator
          initialRouteName={ROUTES.HOME_SCREEN}
          screenOptions={{
            tabBarActiveTintColor: '#e91e63',
            headerShown: false,
          }}
        >
          <Tab.Screen
            name={ROUTES.HOME_SCREEN}
            component={HomeScreen}
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
              tabBarLabel: 'Notifications',
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