import auth from '@react-native-firebase/auth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { LatLng } from 'react-native-maps';
import { Modalize } from 'react-native-modalize';
import { useSelector } from 'react-redux';

import Wheel from '../../assets/wheel';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { ReduxState } from '../../interfaces/redux';
import { Trip } from '../../interfaces/trip';
import { calculateCost, createTrip } from '../../services/trips';
import Map from './components/map';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.HOME_SCREEN>;
const { MAPS_API_KEY } = Config;

function Home({ navigation }: Props) {
  const { logedIn } = useSelector((state: ReduxState) => state.auth);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const { obtained: profileObtained } = useSelector(
    (state: ReduxState) => state.profile
  );
  const [trip, setTrip] = useState<Trip | null>(null);
  const [tripCost, setTripCost] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const modalRef = useRef<Modalize>(null);

  useEffect(() => {
    const getToken = async () => {
      if (logedIn) {
        const userToken = await auth().currentUser?.getIdToken();
        console.log('userToken', userToken);
        setToken(userToken || null);
      }
    };
    getToken();
  }, [logedIn]);

  const onAcceptTrip = async () => {
    const trip = await createTrip({ from: origin!, to: destination! }, token!);
    modalRef.current?.close();
    setTrip(trip);
  };

  const onCancelTrip = async () => {
    setDestination(null);
    modalRef.current?.close();
  };

  useEffect(() => {
    if (!logedIn) {
      navigation.navigate(ROUTES.LOGIN_SCREEN);
      return;
    }
    if (logedIn && !profileObtained) {
      navigation.navigate(ROUTES.SET_PROFILE_SCREEN);
    }
  }, [logedIn, profileObtained]);

  useEffect(() => {
    if (trip) {
      navigation.navigate(ROUTES.PASSENGER_TRIP_GUIDE, { trip });
    }
  }, [trip]);

  useEffect(() => {
    const getCost = async () => {
      const cost = await calculateCost(
        { from: origin!, to: destination! },
        token!
      );
      setTripCost(cost);
      modalRef.current?.open();
    };
    if (origin && destination && logedIn) {
      getCost();
    }
  }, [origin, destination]);

  return (
    <>
      <View
        style={{
          margin: 10,
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'flex-start',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 40,
            width: 35,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              borderRadius: 50,
              padding: 1,
              alignContent: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}
            onPress={() => navigation.navigate(ROUTES.DRIVER_TRIP)}>
            <Wheel width={'100%'} height={'100%'} />
          </TouchableOpacity>
        </View>
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: 'geometry' }}
          fetchDetails={true} // you need this to fetch the details object onPress
          placeholder="Search"
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
          textInputProps={{ placeholderTextColor: 'grey' }}
          styles={{
            container: { marginLeft: 10 },
            textInput: {color: 'grey'},
            row: {backgroundColor: 'grey'}}}
        />
      </View>
      <Map
        destination={destination}
        setDestination={setDestination}
        origin={origin}
        setOrigin={setOrigin}
        trip={trip}
      />
      <Modal modalRef={modalRef} adjustToContentHeight>
        <Header
          center={
            <Text style={{ marginTop: 20 }} type="subtitle1">
              Confirmar viaje
            </Text>
          }
        />
        <View style={styles.modalContainer}>
          <Text type="subtitle2">Costo del viaje: </Text>
          <Text type="subtitle2">$ {tripCost?.toFixed(2)}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Button
            buttonStyle={{
              alignSelf: 'center',
              paddingHorizontal: '10%',
              marginRight: 10,
              backgroundColor: 'red',
            }}
            text="Cancel"
            onPress={onCancelTrip}
          />
          <Button
            buttonStyle={{
              alignSelf: 'center',
              paddingHorizontal: '10%',
              marginLeft: 10,
              backgroundColor: 'green',
            }}
            text="Accept"
            onPress={onAcceptTrip}
          />
        </View>
      </Modal>
    </>
  );
}

export default Home;
