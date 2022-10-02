import { ROUTES } from '../constants/routes';
import { CommonsProfile } from './profile';

export type RootStackParamList = {
  [ROUTES.WELCOME]: undefined;
  [ROUTES.LOGIN_SCREEN]: undefined;
  [ROUTES.SIGNUP_SCREEN]: undefined;
  [ROUTES.HOME_SCREEN]: undefined;
  [ROUTES.SET_PROFILE_SCREEN]: undefined;
  [ROUTES.SET_DRIVER_PROFILE_SCREEN]: { commonProfile: CommonsProfile };
};
