import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import { Bar as ProgressBarr } from 'react-native-progress';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { Colors } from '../../../../../constants/theme';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import {
  fetchDriverProfile,
  reloadTrip,
} from '../../../../../redux/slices/trip';
import styles from '../../../styles';
import { IModalComponentArgs } from '..';

const DriverAccept = ({ setOnClosed, modalRef }: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();
  const { driver, driverId } = useSelector((state: ReduxState) => state.trip);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(reloadTrip());
  }, []);

  useEffect(() => {
    setOnClosed(() => () => {
      setTimeout(() => {
        modalRef?.current?.open();
      }, 100);
    });

    return () => {
      setOnClosed(undefined);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchDriverProfile());
  }, [driverId]);

  return (
    <>
      <Header
        center={
          <Text style={styles.ModalTitle} type="subtitle1">
            {t('passangerTrip.driverAccept.title')}
          </Text>
        }
      />
      <View style={styles.ModalContainer}>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">
            {t('passangerTrip.driverAccept.driverName')}
          </Text>
          <Text type="subtitle2">{driver?.firstName}</Text>
        </View>
        {driver?.rating && driver?.rating != -1 && (
          <View style={styles.ModalRating}>
            <Text type="subtitle2">
              {t('passangerTrip.driverAccept.driverRating')}
            </Text>
            <Rating
              readonly
              tintColor={Colors.Black.Pure}
              startingValue={driver?.rating || 0}
            />
          </View>
        )}
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
