import { ROUTES } from '../constants/routes';
import { CommonsProfile } from './profile';
import { LatLng } from 'react-native-maps';

export type RootStackParamList = {
  [ROUTES.WELCOME]: undefined;
  [ROUTES.LOGIN_SCREEN]: undefined;
  [ROUTES.SIGNUP_SCREEN]: undefined;
  [ROUTES.HOME_SCREEN]: undefined;
  [ROUTES.SET_PROFILE_SCREEN]: undefined;
  [ROUTES.SET_DRIVER_PROFILE_SCREEN]: { commonProfile: CommonsProfile };
  [ROUTES.DRIVER_TRIP]: undefined;
  [ROUTES.PASSENGER_TRIP_GUIDE]: { destination: LatLng};
};
