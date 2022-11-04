import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import { Bar as ProgressBarr } from 'react-native-progress';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import useUserToken from '../../../../../hooks/useUserToken';
import useWaitingForTrip from '../../../../../hooks/useWaitingForTrip';

const WaitingForTrip = ({
  modalRef,
}: {
  modalRef: React.RefObject<IHandles>;
}) => {
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
