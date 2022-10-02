import * as Auth from '@react-native-firebase/auth';

import { store } from '../redux';
import { Profile } from './profile';

export interface AuthState {
  logedIn: boolean;
  user: Auth.FirebaseAuthTypes.User | null;
  error: string | null;
}

export interface ProfileState {
  obtained: boolean;
  profile: Profile | null;
  error: string | null;
}
export interface ReduxState {
  auth: AuthState;
  profile: ProfileState;
}

export interface AuthLoginParams {
  email: string;
  password: string;
  onError: (error: string) => void;
}

export interface ProfileGetParams {
  uid: string;
}

export interface ProfileUpdateParams {
  uid: string;
  profile: Profile;
}

export type AppDispatch = typeof store.dispatch;
