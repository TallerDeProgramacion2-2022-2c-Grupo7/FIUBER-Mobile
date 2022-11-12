import { ROUTES } from '../constants/routes';
import { CommonsProfile } from './profile';
import { Trip } from './trip';

export type RootStackParamList = {
  [ROUTES.WELCOME]: undefined;
  [ROUTES.LOGIN_SCREEN]: undefined;
  [ROUTES.SIGNUP_SCREEN]: undefined;
  [ROUTES.HOME_SCREEN]: undefined;
  [ROUTES.SET_PROFILE_SCREEN]: undefined;
  [ROUTES.SET_DRIVER_PROFILE_SCREEN]: { commonProfile: CommonsProfile };
  [ROUTES.PHONE_VERIFICATION_SCREEN]: undefined;
  [ROUTES.DRIVER_TRIP]: undefined;
  [ROUTES.PASSENGER_TRIP_GUIDE]: { trip: Trip };
  [ROUTES.PHONE_VERIFICATION_SCREEN]: undefined;
};
