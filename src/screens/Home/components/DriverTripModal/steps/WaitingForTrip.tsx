/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Bar as ProgressBarr } from 'react-native-progress';
import messaging from '@react-native-firebase/messaging';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import useWaitingForTrip from '../../../../../hooks/useWaitingForTrip';
import styles from '../../../styles';
import { IModalComponentArgs } from '../../DriverTripModal';

const WaitingForTrip = ({
  setOnClose,
  setOnClosed,
  setDriverMode,
  setAllwaysOpen,
  modalRef,
}: IModalComponentArgs) => {
  const { t } = useTranslation();
  useWaitingForTrip();

  useEffect(() => {
    messaging().subscribeToTopic('availableTrips').then(() => console.log('Subscribed to topic availableTrips!'));;
    setAllwaysOpen(undefined);
    setOnClosed(() => () => {});
    setTimeout(() => {
      modalRef.current?.open();
    }, 100);
  }, []);

  useEffect(() => {
    setOnClose(() => () => {
      setDriverMode(false);
    });
  }, []);

  return (
    <>
      <Header
        center={
          <Text style={styles.ModalTitle} type="subtitle1">
            {t('driverTrip.waitingTrip.title')}
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
