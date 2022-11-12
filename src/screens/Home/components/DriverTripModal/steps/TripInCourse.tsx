import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Bar as ProgressBarr } from 'react-native-progress';
import { useDispatch } from 'react-redux';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import useUserToken from '../../../../../hooks/useUserToken';
import { AppDispatch } from '../../../../../interfaces/redux';
import { reloadTrip } from '../../../../../redux/slices/trip';
import { IModalComponentArgs } from '..';

const TripInCourse = ({ setAllwaysOpen }: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();

  const token = useUserToken();

  useEffect(() => {
    setAllwaysOpen(85);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(reloadTrip({ token }));
    }
  }, [token]);

  return (
    <>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            Yendo al destino final;
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

export default TripInCourse;
