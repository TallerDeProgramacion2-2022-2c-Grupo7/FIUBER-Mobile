import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import { Bar as ProgressBarr } from 'react-native-progress';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import useUserToken from '../../../../../hooks/useUserToken';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import { getDriverProfile } from '../../../../../redux/slices/trip';

const DriverAccept = ({}: { modalRef: React.RefObject<IHandles> }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { driver } = useSelector((state: ReduxState) => state.trip);

  const token = useUserToken();

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(getDriverProfile({ token }));
  }, [token]);

  return (
    <>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            Chofer en camino
          </Text>
        }
      />
      <View style={styles.modalContainer}>
        <View style={styles.textContainer}>
          <Text type="subtitle2">Chofer: </Text>
          <Text type="subtitle2">{driver?.firstName}</Text>
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

export default DriverAccept;

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
