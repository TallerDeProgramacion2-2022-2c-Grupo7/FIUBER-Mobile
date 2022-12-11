import auth from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { AppDispatch, ReduxState } from '../../interfaces/redux';
import { setUser } from '../../redux/slices/auth';
import { getMyProfile } from '../../redux/slices/profile';
import { initWallet } from '../../redux/slices/wallet';
import HomeScreen from '../Home';
import MyProfile from '../MyProfile';
import Wallet from '../Wallet';

const Tab = createBottomTabNavigator<RootStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.TAB_SCREEN>;

function MainTab({ navigation }: Props) {
  const { logedIn } = useSelector((state: ReduxState) => state.auth);
  const { savedProfile } = useSelector((state: ReduxState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();

  const initApp = async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      await dispatch(getMyProfile({ uid: currentUser.uid }));
      await dispatch(initWallet({ uid: currentUser.uid }));
      await dispatch(setUser(currentUser.toJSON()));
    }
  };

  useEffect(() => {
    if (!logedIn && auth().currentUser === null) {
      navigation.navigate(ROUTES.WELCOME);
      return;
    }

    if (savedProfile === false) {
      navigation.navigate(ROUTES.SET_PROFILE_SCREEN);
      return;
    }

    if (savedProfile === true) {
      return;
    }

    initApp();
  }, [logedIn, savedProfile]);

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME_SCREEN}
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        headerShown: false,
      }}>
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
        name={ROUTES.WALLET}
        component={Wallet}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="wallet" color={color} size={size} />
          ),
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
