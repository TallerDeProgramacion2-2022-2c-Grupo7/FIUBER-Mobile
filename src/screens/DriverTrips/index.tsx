import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Button from '../../components/Button';
import KeyboardScrollView from '../../components/KeyboardScrollView';
import Text from '../../components/Text';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { Container } from '../../layouts';
import styles from './styles';

type Props = NativeStackScreenProps<
  RootStackParamList,
  ROUTES.DRIVER_TRIPS
>;

type Trip = {
  trip_id: null | string,
  from: null | string,
  to: null | string,
  uid: null | string,
  distance: null | number,
  time: null | number,
};

const NULL_TRIP = {
  trip_id: null,
  from: null,
  to: null,
  uid: null,
  distance: null,
  time: null
};

// Test functions
const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), 5000)
  });
};

const getAvailableTrip = async () => {
  await delay();
  return {
    trip_id: 'test',
    from: 'x',
    to: 'y',
    uid: 'test',
    distance: 1.5,
    time: 2
  }
}

function DriverTrips({ navigation }: Props) {
  const { t } = useTranslation();
  const [trip, setTrip] = useState<Trip>(NULL_TRIP);
  const [acceptedTrip, setAcceptedTrip] = useState<Trip>(NULL_TRIP);
  const [loading, setLoading] = useState(false);

  const loadTrip = async () => {
    const availableTrip = await getAvailableTrip();
    setTrip(availableTrip);
    // Nota: el delay debería ser un poco menos que el tiempo de validez de un available trip.
    // Por ejemplo, si se define que un trip dura 30 segundos en el estado available,
    // podríamos poner un delay de 20 segundos. Al pasar este tiempo, el front volvería a
    // hacer un request a /trips/available y el back debería expirar ese trip para
    // este chofer y devolver uno nuevo.
    await delay();
    setTrip(NULL_TRIP);
    setLoading(false);
  };

  useEffect(() => {
    if (!loading && !acceptedTrip.trip_id) {
      setLoading(true);
      loadTrip();
    }
  });

  if (!trip.trip_id && !acceptedTrip.trip_id) {
    return (
      <Container>
        <KeyboardScrollView contentStyle={styles.container}>
          <View>
            <Text style={styles.title}>{t('driverTrip.searching')}</Text>
          </View>
        </KeyboardScrollView>
      </Container>
    );
  }

  return (
    <Container>
      <KeyboardScrollView contentStyle={styles.container}>
        <View>
          <Text style={styles.title}>{t('driverTrip.available')}</Text>
        </View>
        <View>
          <Text style={styles.title}>
            {trip.distance || acceptedTrip.distance} km - {trip.time || acceptedTrip.time} min
          </Text>
        </View>
        <Button
          text={acceptedTrip.trip_id ? t('driverTrip.accepted') : t('driverTrip.accept')}
          onPress={() => setAcceptedTrip(trip)}
          loading={false}
          disabled={acceptedTrip.trip_id ? true : false}
          buttonStyle={styles.buttonMargin}
        />
      </KeyboardScrollView>
    </Container>
  );
}

export default DriverTrips;
