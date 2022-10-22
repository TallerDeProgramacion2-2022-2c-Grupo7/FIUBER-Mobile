import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker, UserLocationChangeEvent } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch, useSelector } from 'react-redux';

import Target from '../../../assets/target';
import useMapPermissions from '../../../hooks/useMapPermissions';
import { ReduxState } from '../../../interfaces/redux';
import { setOrigin } from '../../../redux/slices/trip';

const { MAPS_API_KEY } = Config;

function Map({}) {
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  const { origin, destination } = useSelector(
    (state: ReduxState) => state.trip
  );

  const mapRef = useRef<MapView>(null);

  const locationPerms = useMapPermissions();

  const onUserLocationChange = ({ nativeEvent }: UserLocationChangeEvent) => {
    if (!nativeEvent.coordinate) {
      return;
    }
    if (mapRef && mapRef.current && !focused) {
      dispatch(setOrigin({ coordinates: nativeEvent.coordinate }));
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

  const onDirectionReady = () => {
    if (origin && destination) {
      mapRef?.current?.fitToCoordinates([
        origin.coordinates,
        destination.coordinates,
      ]);
    }
  };

  return locationPerms ? (
    <>
      <MapView
        showsCompass={false}
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        onUserLocationChange={onUserLocationChange}>
        {destination && origin && (
          <>
            <MapViewDirections
              {...ViewDirectionArgs}
              origin={origin.coordinates}
              destination={destination.coordinates}
              onReady={onDirectionReady}
            />
            <Marker coordinate={destination.coordinates} />
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

const ViewDirectionArgs = {
  strokeColor: '#007EC6',
  strokeWidth: 4,
  apikey: MAPS_API_KEY,
};

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
