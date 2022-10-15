import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import Config from 'react-native-config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { LatLng } from 'react-native-maps';
import { useSelector } from 'react-redux';

import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { ReduxState } from '../../interfaces/redux';
import { Container } from '../../layouts';
import Map from './components/map';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.HOME_SCREEN>;
const { MAPS_API_KEY } = Config;

function Home({ navigation }: Props) {
  const { logedIn } = useSelector((state: ReduxState) => state.auth);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const { obtained: profileObtained } = useSelector(
    (state: ReduxState) => state.profile
  );

  useEffect(() => {
    if (!logedIn) {
      navigation.navigate(ROUTES.LOGIN_SCREEN);
      return;
    }
    if (logedIn && !profileObtained) {
      navigation.navigate(ROUTES.SET_PROFILE_SCREEN);
    }
  }, [logedIn, profileObtained]);

  return (
    <Container>
      <Button title="Driver" onPress={() => navigation.navigate(ROUTES.DRIVER_TRIP)} />
      <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{ fields: 'geometry' }}
        fetchDetails={true} // you need this to fetch the details object onPress
        placeholder="Search"
        styles={{
          textInput: {
            height: 38,
            color: '#ffffff',
            backgroundColor: 'grey',
            fontSize: 16,
          },
           row: {
             backgroundColor: 'grey',
           },
          }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          if (details?.geometry?.location) {
            const { lat, lng } = details.geometry.location;
            setDestination({ latitude: lat, longitude: lng });
          }
        }}
        query={{
          key: MAPS_API_KEY,
          language: 'en',
        }}
      />
      <Map destination={destination} />
    </Container>
  );
}

export default Home;
