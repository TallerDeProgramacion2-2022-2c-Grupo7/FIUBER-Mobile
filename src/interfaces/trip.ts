import { LatLng } from 'react-native-maps';

export interface TripCordinates {
  from: LatLng;
  to: LatLng;
}
export interface Trip {
  _id: string;
  from: LatLng;
  to: LatLng;
  userId: string;
  cost: number;
  driverId?: string;
  status: TripStatus;
}

export interface MapPoint {
  name: string;
  coordinates: LatLng;
}

export enum TripStatus {
  WAITING_USER = 'waiting_user',
  SERCHING_DRIVER = 'searching_driver',
  WAITING_DRIVER = 'waiting_driver',
  ACCEPTED = 'accepted',
  STARTED = 'started',
  FINISHED = 'finished',
}
