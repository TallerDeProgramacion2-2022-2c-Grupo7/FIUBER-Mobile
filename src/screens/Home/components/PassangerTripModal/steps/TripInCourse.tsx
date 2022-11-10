import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import { useSelector } from 'react-redux';

import Button from '../../../../../components/Button';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import useUserToken from '../../../../../hooks/useUserToken';
import { ReduxState } from '../../../../../interfaces/redux';
import { finishTrip } from '../../../../../services/trips';

const TripInCourse = ({}: { modalRef: React.RefObject<IHandles> }) => {
  const { driver, id } = useSelector((state: ReduxState) => state.trip);

  const token = useUserToken();

  const onFinishTrip = () => {
    if (!token || !id) {
      return;
    }
    finishTrip(id, token);
  };

  return (
    <>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            Viaje en curso
          </Text>
        }
      />
      <View style={styles.modalContainer}>
        <View style={styles.textContainer}>
          <Text type="subtitle2">Chofer: </Text>
          <Text type="subtitle2">{driver?.firstName}</Text>
        </View>
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
            marginLeft: 10,
            backgroundColor: 'green',
          }}
          text="Finish"
          onPress={onFinishTrip}
        />
      </View>
    </>
  );
};

export default TripInCourse;

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
