import * as Auth from '@react-native-firebase/auth';
import { LatLng } from 'react-native-maps';

import { store } from '../redux';
import { Profile } from './profile';
import { MapPoint, TripStatus } from './trip';

export interface TripState {
  id: string | null;
  from: MapPoint | null;
  to: MapPoint | null;
  passangerId: string | null;
  passsanger: Profile | null;
  driverId: string | null;
  driver: Profile | null;
  cost: number | null;
  distance: number | null;
  duration: number | null;
  status: TripStatus | null;
  currentPosition: LatLng | null;
}
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
  trip: TripState;
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
