import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Bar as ProgressBarr } from 'react-native-progress';
import { useDispatch } from 'react-redux';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { AppDispatch } from '../../../../../interfaces/redux';
import { clearTrip } from '../../../../../redux/slices/trip';
import { IModalComponentArgs } from '../index';

const TripFinished = ({ setOnClose }: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();

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
