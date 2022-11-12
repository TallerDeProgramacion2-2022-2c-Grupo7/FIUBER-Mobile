import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import { Bar as ProgressBarr } from 'react-native-progress';
import { useSelector } from 'react-redux';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { ReduxState } from '../../../../../interfaces/redux';

const WaitingForDriver = ({}: { modalRef: React.RefObject<IHandles> }) => {
  const { to, cost } = useSelector((state: ReduxState) => state.trip);

  return (
    <>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            Esperando por un conductor
          </Text>
        }
      />
      <View style={styles.modalContainer}>
        <View style={styles.textContainer}>
          <Text type="subtitle2">Destino: </Text>
          <Text type="subtitle2">
            {to?.description?.formattedAddress.mainText || ''}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text type="subtitle2">Costo del viaje: </Text>
          <Text type="subtitle2">$ {cost?.toFixed(2)}</Text>
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

export default WaitingForDriver;

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
