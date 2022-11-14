import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Bar as ProgressBarr } from 'react-native-progress';
import { useDispatch } from 'react-redux';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { AppDispatch } from '../../../../../interfaces/redux';
import { setOnTheMove } from '../../../../../redux/slices/trip';
import { IModalComponentArgs } from '..';

const TripAccepted = ({ setAllwaysOpen }: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    setAllwaysOpen(85);
  }, []);

  useEffect(() => {
    dispatch(setOnTheMove(true));
  }, []);

  return (
    <>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            Yendo a buscar al usuario;
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

export default TripAccepted;
