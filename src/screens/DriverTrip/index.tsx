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
  ROUTES.DRIVER_TRIP
>;

type Trip = {
  trip_id: null | string,
  from: null | string,
  to: null | string,
  uid: null | string,
  distance: null | number,
  time: null | number,
  cost: null | number,
};

const NULL_TRIP = {
  trip_id: null,
  from: null,
  to: null,
  uid: null,
  distance: null,
  time: null,
  cost: null
};

// Test functions
const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), 2000)
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
    time: 2,
    cost: 500,
  }
}

function DriverTrip({ navigation }: Props) {
  const { t } = useTranslation();
  const [trip, setTrip] = useState<Trip>(NULL_TRIP);
  const [acceptedTrip, setAcceptedTrip] = useState(false);

  const setAvailableTrip = async () => {
    setTrip(await getAvailableTrip());
  };

  const unsetAvailableTripIfNotAccepted = () => {
    setTimeout(() => {
      setAcceptedTrip(value => {
        if (!value) {
          setTrip(NULL_TRIP);
        }
        return value;
      });
    }, 5000);
  };

  useEffect(() => {
    if (!trip.trip_id) {
      setAvailableTrip();
    } else {
      unsetAvailableTripIfNotAccepted();
    }
  }, [trip]);

  if (!trip.trip_id) {
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
            {trip.distance} km - {trip.time} min
          </Text>
        </View>
        <View>
          <Text style={styles.title}>
            $ {trip.cost}
          </Text>
        </View>
        <Button
          text={acceptedTrip ? t('driverTrip.accepted') : t('driverTrip.accept')}
          onPress={() => setAcceptedTrip(true)}
          loading={false}
          disabled={acceptedTrip}
          buttonStyle={styles.buttonMargin}
        />
      </KeyboardScrollView>
    </Container>
  );
}

export default DriverTrip;
