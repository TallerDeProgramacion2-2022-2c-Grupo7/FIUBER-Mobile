import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';

import Wheel from '../../assets/wheel';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { AppDispatch, ReduxState } from '../../interfaces/redux';
import { TripStatus } from '../../interfaces/trip';
import {
  obtainCalculatedCost,
  setCurrentPositionAsFrom,
  setStatus,
  setTo,
} from '../../redux/slices/trip';
import DriverTripModal from './components/DriverTripModal';
import Map from './components/map';
import PassangerTripModal from './components/PassangerTripModal';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.HOME_SCREEN>;
const { MAPS_API_KEY } = Config;

function Home({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [driverMode, setDriverMode] = useState(false);
  const { to, from } = useSelector((state: ReduxState) => state.trip);
  const { profile } = useSelector((state: ReduxState) => state.profile);

  const driverModalRef = useRef<Modalize>(null);
  const passangerModalRef = useRef<Modalize>(null);

  const onDestinationSelected = async (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    if (details?.geometry?.location) {
      const { lat, lng } = details.geometry.location;
      await dispatch(
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
      await dispatch(setCurrentPositionAsFrom());

      await dispatch(setStatus(TripStatus.WAITING_USER));

      if (from && to) {
        await dispatch(
          obtainCalculatedCost({ from: from.coordinates, to: to.coordinates })
        );
      }

      passangerModalRef.current?.open();
    }
  };

  const onClickDriverMode = async () => {
    await dispatch(setStatus(TripStatus.WAITING_FOR_TRIP));
    setDriverMode(true);

    driverModalRef.current?.open();
  };

  return (
    <>
      <View style={styles.searchBoxContainer}>
        {profile?.isDriver && (
          <View style={styles.SearchBoxButtonContainer}>
            <TouchableOpacity
              style={styles.SearchBoxButton}
              onPress={onClickDriverMode}>
              <Wheel width={'100%'} height={'100%'} />
            </TouchableOpacity>
          </View>
        )}
        <GooglePlacesAutocomplete
          {...PlaceAutoCompleteArgs}
          onPress={onDestinationSelected}
        />
      </View>
      <Map />
      {profile?.isDriver ? (
        <DriverTripModal
          driverMode={driverMode}
          setDriverMode={setDriverMode}
          modalRef={driverModalRef}
        />
      ) : (
        <PassangerTripModal modalRef={passangerModalRef} />
      )}
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
  textInputProps: { placeholderTextColor: 'grey' },
  styles: {
    container: { marginLeft: 10 },
    textInput: { color: 'grey' },
    row: { backgroundColor: 'grey' },
  },
};

export default Home;
