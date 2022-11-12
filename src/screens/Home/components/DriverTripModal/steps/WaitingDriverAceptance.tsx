/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../../components/Button';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import useUserToken from '../../../../../hooks/useUserToken';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import { clearTrip, goToTripFrom } from '../../../../../redux/slices/trip';
import { accept } from '../../../../../services/trips';
import { IModalComponentArgs } from '../../DriverTripModal';

const WaitingDriverAceptance = ({
  setAllwaysOpen,
  setOnClose,
}: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cost, id } = useSelector((state: ReduxState) => state.trip);
  const token = useUserToken();

  useEffect(() => {
    setAllwaysOpen(85);
    setOnClose(() => {
      return () => {
        dispatch(clearTrip());
      };
    });
    return () => {
      setAllwaysOpen(undefined);
      setOnClose(() => () => {});
    };
  }, []);

  const onAcceptTrip = async () => {
    if (id && token) {
      await dispatch(goToTripFrom({}));
      accept(id, token);
    }
  };

  const onCancelTrip = async () => {
    dispatch(clearTrip());
  };

  return (
    <>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            Confirmar viaje
          </Text>
        }
      />
      <View style={styles.modalContainer}>
        <Text type="subtitle2">Costo del viaje: </Text>
        <Text type="subtitle2">$ {cost?.toFixed(2)}</Text>
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
    </>
  );
};

export default WaitingDriverAceptance;

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    flex: 1,
    flexDirection: 'row',
  },
});
