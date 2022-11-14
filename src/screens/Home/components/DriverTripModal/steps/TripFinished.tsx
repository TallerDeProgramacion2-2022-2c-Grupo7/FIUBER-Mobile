import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Bar as ProgressBarr } from 'react-native-progress';
import { useDispatch } from 'react-redux';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { AppDispatch } from '../../../../../interfaces/redux';
import { setOnTheMove } from '../../../../../redux/slices/trip';
import { IModalComponentArgs } from '..';

const TripFinished = ({ modalRef, setAllwaysOpen }: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setAllwaysOpen(undefined);
    modalRef.current?.open();
  }, []);

  useEffect(() => {
    dispatch(setOnTheMove(false));
  });

  return (
    <>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            Viaje finalizado;
          </Text>
        }
      />
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
