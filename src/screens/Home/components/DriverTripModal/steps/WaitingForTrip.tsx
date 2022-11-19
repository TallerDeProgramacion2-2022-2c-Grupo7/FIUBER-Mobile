/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Bar as ProgressBarr } from 'react-native-progress';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import useWaitingForTrip from '../../../../../hooks/useWaitingForTrip';
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
          <Text style={{ marginTop: 20 }} type="subtitle1">
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
