import * as Auth from '@react-native-firebase/auth';

import { store } from '../redux';
import { Profile } from './profile';
import {
  MapPoint,
  TripStatus,
  UserLocationChangeEventCoordinate,
} from './trip';

type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

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
  currentPosition: UserLocationChangeEventCoordinate | null;
  onTheMove: boolean;
  nearToDestination: boolean;
  isUnfinishedTrip: boolean;
}
export interface AuthState {
  logedIn: boolean;
  user: Auth.FirebaseAuthTypes.User | null;
  error: string | null;
}

export interface ProfileState {
  savedProfile: boolean | null;
  profile: Profile | null;
  error: string | null;
}

export interface WalletState {
  init: boolean;
  balance?: number;
  locked?: number;
  publicKey: string;
}
export interface ReduxState {
  auth: AuthState;
  profile: ProfileState;
  trip: TripState;
  wallet: WalletState;
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
  profile: DeepPartial<Profile>;
}

export type AppDispatch = typeof store.dispatch;
