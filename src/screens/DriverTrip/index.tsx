import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InteractionManager, View } from 'react-native';
import { useSelector } from 'react-redux';

import Button from '../../components/Button';
import KeyboardScrollView from '../../components/KeyboardScrollView';
import Text from '../../components/Text';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { ReduxState } from '../../interfaces/redux';
import { Trip } from '../../interfaces/trip';
import { Container } from '../../layouts';
import { accept, getAvailable } from '../../services/trips';
import { delay } from '../../utils';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.DRIVER_TRIP>;

// Test functions

function DriverTrip({ navigation }: Props) {
  const { t } = useTranslation();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [acceptedTrip, setAcceptedTrip] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { logedIn } = useSelector((state: ReduxState) => state.auth);

  useEffect(() => {
    const getToken = async () => {
      if (logedIn) {
        const userToken = await auth().currentUser?.getIdToken();
        setToken(userToken || null);
      }
    };
    getToken();
  }, [logedIn]);

  const lookAvailableTrip = async () => {
    const availableTrip = await getAvailable(token!);
    return availableTrip;
  };

  useEffect(() => {
    const waitingFn = InteractionManager.runAfterInteractions;
    waitingFn(async () => {
      if (token) {
        while (!trip) {
          const availableTrip = await lookAvailableTrip();
          if (availableTrip) {
            setTrip(availableTrip);
            break;
          }
          await delay(3000);
        }
      }
    });
  }, [trip, token]);

  const onAcceptTrip = async () => {
    if (trip && token) {
      console.log(trip);
      console.log(token);
      accept(trip._id, token);
      setAcceptedTrip(true);
    }
  };

  return trip ? (
    <Container>
      <KeyboardScrollView contentStyle={styles.container}>
        <View>
          <Text style={styles.title}>{t('driverTrip.available')}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>Id: </Text>
          <Text style={styles.title}>{trip._id}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>Costo: </Text>
          <Text style={styles.title}>$ {trip.cost.toFixed(2)}</Text>
        </View>
        <Button
          text={
            acceptedTrip ? t('driverTrip.accepted') : t('driverTrip.accept')
          }
          onPress={onAcceptTrip}
          loading={false}
          disabled={acceptedTrip}
          buttonStyle={styles.buttonMargin}
        />
      </KeyboardScrollView>
    </Container>
  ) : (
    <Container>
      <KeyboardScrollView contentStyle={styles.container}>
        <View>
          <Text style={styles.title}>{t('driverTrip.searching')}</Text>
        </View>
      </KeyboardScrollView>
    </Container>
  );
}

export default DriverTrip;
