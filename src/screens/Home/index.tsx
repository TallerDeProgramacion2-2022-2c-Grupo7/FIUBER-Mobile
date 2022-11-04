import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';

import Wheel from '../../assets/wheel';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { ReduxState } from '../../interfaces/redux';
import { TripStatus } from '../../interfaces/trip';
import { setStatus, setTo } from '../../redux/slices/trip';
import DriverTripModal from './components/DriverTripModal';
import Map from './components/map';
import PassangerTripModal from './components/PassangerTripModal';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.HOME_SCREEN>;
const { MAPS_API_KEY } = Config;

function Home({ navigation }: Props) {
  const dispatch = useDispatch();
  const [driverMode, setDriverMode] = useState(false);
  const { logedIn } = useSelector((state: ReduxState) => state.auth);
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

  const onDestinationSelected = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    if (details?.geometry?.location) {
      const { lat, lng } = details.geometry.location;
      dispatch(
        setTo({
          coordinates: { latitude: lat, longitude: lng },
          description: {
            name: data.description,
            formattedAddress: {
              mainText: data.structured_formatting.main_text,
              secondaryText: data.structured_formatting.secondary_text,
            },
          },
        })
      );
      dispatch(setStatus(TripStatus.WAITING_USER));
    }
  };

  return (
    <>
      <View style={styles.searchBoxContainer}>
        <View style={styles.SearchBoxButtonContainer}>
          <TouchableOpacity
            style={styles.SearchBoxButton}
            onPress={() => setDriverMode(!driverMode)}>
            <Wheel width={'100%'} height={'100%'} />
          </TouchableOpacity>
        </View>
        <GooglePlacesAutocomplete
          {...PlaceAutoCompleteArgs}
          onPress={onDestinationSelected}
        />
      </View>
      <Map />
      {driverMode ? <DriverTripModal /> : <PassangerTripModal />}
    </>
  );
}

const PlaceAutoCompleteArgs = {
  GooglePlacesDetailsQuery: { fields: 'geometry' },
  fetchDetails: true, // you need this to fetch the details object onPress
  placeholder: 'Search',
  query: {
    key: MAPS_API_KEY,
    language: 'en',
  },
  styles: { container: { marginLeft: 10 } },
};

export default Home;
