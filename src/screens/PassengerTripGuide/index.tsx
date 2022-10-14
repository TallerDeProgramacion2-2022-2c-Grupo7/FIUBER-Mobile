import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Text from '../../components/Text';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { LatLng } from 'react-native-maps';

import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { ReduxState } from '../../interfaces/redux';
import { Container } from '../../layouts';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.PASSENGER_TRIP_GUIDE>;

function PassengerTripGuide({navigation}: Props) {

 const { params } =
    useRoute<RouteProp<RootStackParamList, ROUTES.PASSENGER_TRIP_GUIDE>>();
  const { destination } = params;

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>{"This is the Passenger trip guide screen"}</Text>
        <Text style={styles.title}>{destination.latitude}</Text>
      </View>
    </Container>
  );
}

export default PassengerTripGuide;
