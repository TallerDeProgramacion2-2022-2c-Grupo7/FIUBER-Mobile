import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import { Bar as ProgressBarr } from 'react-native-progress';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import useUserToken from '../../../../../hooks/useUserToken';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import { getDriverProfile } from '../../../../../redux/slices/trip';
import { clearTrip } from '../../../../../redux/slices/trip';
import { IModalComponentArgs } from '../index';

const TripFinished = ({ modalRef, setOnClose }: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();
  const { driver } = useSelector((state: ReduxState) => state.trip);
  const token = useUserToken();

  useEffect(() => {
    setOnClose(() => () => {
      dispatch(clearTrip());
    });
  }, []);

  return (
    <>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            Viaje Finalizado
          </Text>
        }
      />
      <View style={styles.modalContainer}>
        <View style={styles.textContainer}>
          <Text type="subtitle2">Calificar chofer: </Text>
        </View>
      </View>
      <View>
        <ProgressBarr
          indeterminate={true}
          borderWidth={0}
          width={null}
          indeterminateAnimationDuration={2000}
        />
      </View>
    </>
  );
};

export default TripFinished;

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
