import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../../components/Button';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import useGetCost from '../../../../../hooks/useGetCost';
import useUserToken from '../../../../../hooks/useUserToken';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import { createNewTrip, setTo } from '../../../../../redux/slices/trip';

const WaitingUserAceptance = ({
  modalRef,
}: {
  modalRef: React.RefObject<IHandles>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cost, from, to } = useSelector((state: ReduxState) => state.trip);
  console.log('WAITING USER ACCEPTANCE');

  const token = useUserToken();
  const getCost = useGetCost(from, to, token);

  useEffect(() => {
    console.log('getting cost');
    getCost();
  }, [getCost]);

  useEffect(() => {
    console.log('cost', cost, modalRef.current);
    if (cost) {
      modalRef.current?.open();
    }
  }, [cost]);

  const onAcceptTrip = async () => {
    if (from && to && token) {
      dispatch(createNewTrip({ from, to, token }));
    }
  };

  const onCancelTrip = async () => {
    dispatch(setTo(null));
    modalRef.current?.close();
  };

  return (
    <>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            Confirmar viaje
          </Text>
        }
      />
      <View style={styles.modalContainer}>
        <Text type="subtitle2">Costo del viaje: </Text>
        <Text type="subtitle2">$ {cost?.toFixed(2)}</Text>
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
            marginRight: 10,
            backgroundColor: 'red',
          }}
          text="Cancel"
          onPress={onCancelTrip}
        />
        <Button
          buttonStyle={{
            alignSelf: 'center',
            paddingHorizontal: '10%',
            marginLeft: 10,
            backgroundColor: 'green',
          }}
          text="Accept"
          onPress={onAcceptTrip}
        />
      </View>
    </>
  );
};

export default WaitingUserAceptance;

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    flex: 1,
    flexDirection: 'row',
  },
});
