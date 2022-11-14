/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { UserLocationChangeEventCoordinate } from '../../../interfaces/trip';
import { setCurrentPosition } from '../../../redux/slices/trip';

const { MAPS_API_KEY } = Config;

function Map({}) {
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  const { from, to, onTheMove, currentPosition } = useSelector(
    (state: ReduxState) => state.trip
  );

  const mapRef = useRef<MapView>(null);

  const locationPerms = useMapPermissions();

  const onUserLocationChange = ({ nativeEvent }: UserLocationChangeEvent) => {
    if (!nativeEvent.coordinate) {
      return;
    }
    dispatch(setCurrentPosition(nativeEvent.coordinate));
    if (mapRef && mapRef.current) {
      if (onTheMove) {
        followUserPosition(nativeEvent.coordinate);
      }

      if (!focused) {
        focusUserPosition();
      }
    }
  };

  useEffect(() => {
    console.log(onTheMove);
    followUserPosition();
  }, [onTheMove]);

  const followUserPosition = (
    coordinate?: UserLocationChangeEventCoordinate
  ) => {
    if (!coordinate && !currentPosition) {
      return;
    }

    if (mapRef && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: coordinate?.latitude || currentPosition?.latitude || 0,
          longitude: coordinate?.longitude || currentPosition?.longitude || 0,
        },
        heading: coordinate?.heading || currentPosition?.heading,
        altitude: 1,
        zoom: 18,
        pitch: 45,
      });
    }
  };

  const focusUserPosition = () => {
    if (mapRef && mapRef.current && currentPosition) {
      mapRef.current.animateCamera({
        center: {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
        },
        heading: 0,
        altitude: 1,
        zoom: 18,
      });
      setFocused(true);
    }
  };

  const onDirectionReady = () => {
    if (from && to) {
      mapRef?.current?.fitToCoordinates([from.coordinates, to.coordinates]);
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
        {from && to && (
          <>
            <MapViewDirections
              {...ViewDirectionArgs}
              origin={from.coordinates}
              destination={to.coordinates}
              onReady={onDirectionReady}
            />
            <Marker coordinate={to.coordinates} />
          </>
        )}
      </MapView>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.buttonOpacity}
          onPress={focusUserPosition}>
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
  apikey: MAPS_API_KEY!,
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
