import auth from '@react-native-firebase/auth';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  InteractionManager,
  StyleSheet,
  View,
} from 'react-native';
import { LatLng } from 'react-native-maps';
import { useSelector } from 'react-redux';

import Text from '../../components/Text';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { ReduxState } from '../../interfaces/redux';
import { TripStatus } from '../../interfaces/trip';
import { Container } from '../../layouts';
import { getTripStatus } from '../../services/trips';
import { delay } from '../../utils';
import Map from './components/map';
import styles from './styles';

type Props = NativeStackScreenProps<
  RootStackParamList,
  ROUTES.PASSENGER_TRIP_GUIDE
>;

function PassengerTripGuide({ navigation }: Props) {
  const { params } =
    useRoute<RouteProp<RootStackParamList, ROUTES.PASSENGER_TRIP_GUIDE>>();
  const { trip } = params;
  const [tripState, setTripState] = useState('Finding Driver');
  const [token, setToken] = useState<string | null>(null);
  const [origin, setOrigin] = useState<LatLng | null>(null);

  const { logedIn } = useSelector((state: ReduxState) => state.auth);

  useEffect(() => {
    const getToken = async () => {
      if (logedIn) {
        const userToken = await auth().currentUser?.getIdToken(true);
        console.log('userToken', userToken);
        setToken(userToken || null);
      }
    };
    getToken();
  }, []);

  const tripStateView = () => {
    switch (tripState) {
      case TripStatus.SERCHING_DRIVER:
      case TripStatus.WAITING_DRIVER:
        return 'Looking for driver';
      case TripStatus.ACCEPTED:
        return 'Driver found';
      case TripStatus.STARTED:
        return 'Trip ongoing';
      case TripStatus.FINISHED:
        return 'Trip finished';
    }
  };

  useEffect(() => {
    const waitingFn = InteractionManager.runAfterInteractions;
    waitingFn(async () => {
      if (token) {
        while (true) {
          console.log('getting');
          const status = trip
            ? await getTripStatus(trip?._id, token!)
            : undefined;
          if (status) {
            setTripState(status);
          }
          await delay(5000);
        }
      }
    });
  }, [token]);

  return tripState === TripStatus.STARTED ||
    tripState === TripStatus.FINISHED ? (
    <Container>
      <Text style={[styles.title, styles.top]}>{tripStateView()}</Text>
      <Map destination={trip.to} origin={trip.from} setOrigin={setOrigin} />
    </Container>
  ) : (
    <Container>
      <Text style={[styles.title, styles.componentMargin]}>
        {tripState ? tripStateView() : 'Finding driver...'}
      </Text>
      <ActivityIndicator
        style={StyleSheet.absoluteFill}
        color="white"
        size="large"
      />
    </Container>
  );
}

export default PassengerTripGuide;
