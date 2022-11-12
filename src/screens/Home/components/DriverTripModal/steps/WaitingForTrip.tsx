import React from 'react';
import { View } from 'react-native';
import { Bar as ProgressBarr } from 'react-native-progress';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import useUserToken from '../../../../../hooks/useUserToken';
import useWaitingForTrip from '../../../../../hooks/useWaitingForTrip';
import { IModalComponentArgs } from '../../DriverTripModal';

const WaitingForTrip = ({}: IModalComponentArgs) => {
  const token = useUserToken();
  useWaitingForTrip(token);

  return (
    <>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            Esperando por un viaje
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

export default WaitingForTrip;
