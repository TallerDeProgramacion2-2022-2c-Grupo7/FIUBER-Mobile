import auth from '@react-native-firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { LatLng, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Modalize } from 'react-native-modalize';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { useSelector } from 'react-redux';

import Target from '../../../assets/target';
import { ReduxState } from '../../../interfaces/redux';
import { Trip } from '../../../interfaces/trip';
import { calculateCost, createTrip } from '../../../services/trips';
interface MapProps {
  destination: LatLng | null;
  setDestination?: (destination: LatLng | null) => void;
  origin: LatLng | null;
  setOrigin: (destination: LatLng | null) => void;
  trip?: Trip | null;
}

const { MAPS_API_KEY } = Config;

function Map({ destination, setDestination, origin, setOrigin }: MapProps) {
  const [perms, setPerms] = useState(false);
  const [focused, setFocused] = useState(false);

  const { logedIn } = useSelector((state: ReduxState) => state.auth);

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const askPermissions = async () => {
      switch (await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)) {
        case RESULTS.UNAVAILABLE:
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          console.error('Not coarse location available');
          return;
        case RESULTS.DENIED:
          switch (await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)) {
            case RESULTS.UNAVAILABLE:
            case RESULTS.BLOCKED:
            case RESULTS.LIMITED:
            case RESULTS.DENIED:
              console.error('Not coarse location available');
              return;
          }
      }
      switch (await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)) {
        case RESULTS.UNAVAILABLE:
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          console.error('Not fine location available');
          break;
        case RESULTS.DENIED:
          switch (await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)) {
            case RESULTS.UNAVAILABLE:
            case RESULTS.BLOCKED:
            case RESULTS.LIMITED:
            case RESULTS.DENIED:
              console.error('Not fine location available');
              break;
          }
      }
      setPerms(true);
    };

    askPermissions();
  }, []);

  const onUserLocationChange = ({ nativeEvent }) => {
    if (mapRef && mapRef.current && !focused) {
      setOrigin(nativeEvent.coordinate);
      setFocused(true);

      mapRef.current.animateCamera({
        center: {
          latitude: nativeEvent.coordinate.latitude,
          longitude: nativeEvent.coordinate.longitude,
        },
        heading: nativeEvent.coordinate.heading,
        altitude: 1,
        zoom: 14,
      });
    }
  };

  const onDirectionReady = result => {
    if (origin && destination) {
      mapRef?.current?.fitToCoordinates([origin, destination]);
    }
  };

  // useEffect(() => {
  //   const waitingFn = InteractionManager.runAfterInteractions;
  //   if (waitingDriver) {
  //     waitingFn(async () => {
  //       while (!driver) {
  //         console.log('waiting for driver');
  //         const driver = trip ? await getDriver(trip?._id, token!) : undefined;
  //         if (driver) {
  //           setDriver(driver);
  //           break;
  //         }
  //         await delay(3000);
  //       }
  //     });
  //   }
  // }, [waitingDriver]);

  return perms ? (
    <>
      <MapView
        showsCompass={false}
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        onMapReady={() => {
          console.log('mapRead');
        }}
        onUserLocationChange={onUserLocationChange}>
        {destination && origin && (
          <>
            <MapViewDirections
              strokeColor="#007EC6"
              strokeWidth={4}
              origin={origin}
              destination={destination}
              apikey={MAPS_API_KEY}
              onReady={onDirectionReady}
            />
            <Marker coordinate={destination} />
          </>
        )}
      </MapView>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.buttonOpacity}
          onPress={() => {
            setFocused(false);
          }}>
          <Target width={'100%'} height={'100%'} />
        </TouchableOpacity>
      </View>
    </>
  ) : null;
}

export default Map;

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  version: {
    alignSelf: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  buttonView: {
    position: 'absolute', //use absolute position to show button on top of the map
    top: '90%', //for center align
    left: '85%', //for center align
    alignSelf: 'flex-end', //for align to right
    height: 30,
    width: 30,
  },
  buttonOpacity: {
    alignItems: 'center',
    backgroundColor: '#D0D0D0',
    borderRadius: 50,
    padding: 1,
  },
});
