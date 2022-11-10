import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Bar as ProgressBarr } from 'react-native-progress';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { IModalComponentArgs } from '..';

const TripAccepted = ({ setAllwaysOpen }: IModalComponentArgs) => {
  useEffect(() => {
    setAllwaysOpen(85);
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
