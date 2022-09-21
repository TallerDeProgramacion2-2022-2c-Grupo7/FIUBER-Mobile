import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { AppDispatch, ReduxState } from '../../interfaces/redux';
import { Container } from '../../layouts';
import { logout } from '../../redux/slices/auth';

import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import styles from './styles';




type Props = NativeStackScreenProps<RootStackParamList, ROUTES.HOME_SCREEN>;

function Home({ navigation }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: ReduxState) => state.auth);

  return (
    <Container>
		<MapView

		  style={styles.map}

		  initialRegion={{
		    latitude: 37.78825,
		    longitude: -122.4324,
		    latitudeDelta: 0.0922,
		    longitudeDelta: 0.0421,
		  }}
		/>
    </Container>
  );
}

export default Home;
