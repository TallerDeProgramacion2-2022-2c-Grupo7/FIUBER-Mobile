import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../../components/Button';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { Colors } from '../../../../../constants/theme';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import {
  clearTrip,
  fetchPassangerProfile,
  goToTripFrom,
} from '../../../../../redux/slices/trip';
import { accept, reject } from '../../../../../services/trips';
import styles from '../../../styles';
import { IModalComponentArgs } from '../../DriverTripModal';

const WaitingDriverAceptance = ({
  setAllwaysOpen,
  setOnClosed,
  modalRef,
}: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { cost, duration, id, from, to, passsanger } = useSelector(
    (state: ReduxState) => state.trip
  );

  useEffect(() => {
    setAllwaysOpen(150);
  }, []);

  useEffect(() => {
    setOnClosed(() => () => {
      if (id) {
        reject(id);
      }
      dispatch(clearTrip());
      setTimeout(() => {
        modalRef.current?.open();
      }, 100);
    });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchPassangerProfile());
    }
  }, [id]);

  const onAcceptTrip = async () => {
    if (id) {
      accept(id);
    }
  };

  const onCancelTrip = async () => {
    modalRef.current?.close();
  };

  return (
    <>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            {t('driverTrip.waitingDriver.title')}
          </Text>
        }
      />
      <View style={styles.ModalContainer}>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">{t('driverTrip.waitingDriver.price')}</Text>
          <Text type="subtitle2">$ {cost?.toFixed(2)}</Text>
        </View>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">{t('driverTrip.waitingDriver.duration')}</Text>
          <Text type="subtitle2">{duration} minutes</Text>
        </View>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">{t('driverTrip.waitingDriver.from')}</Text>
          <Text type="subtitle2">
            {' '}
            {from?.description?.formattedAddress.mainText}{' '}
          </Text>
        </View>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">{t('driverTrip.waitingDriver.to')}</Text>
          <Text type="subtitle2">
            {' '}
            {to?.description?.formattedAddress.mainText}{' '}
          </Text>
        </View>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">
            {t('driverTrip.waitingDriver.passanger')}
          </Text>
          <Text type="subtitle2">
            {' '}
            {passsanger?.firstName} {passsanger?.lastName}{' '}
          </Text>
        </View>
        {passsanger?.rating && passsanger?.rating != -1 && (
          <View style={styles.ModalTextContainer}>
            <Text type="subtitle2">{t('driverTrip.tripAccepted.rating')}</Text>
            <Rating
              readonly
              tintColor={Colors.Black.Pure}
              startingValue={passsanger?.rating || 0}
            />
          </View>
        )}
      </View>
      <View style={styles.ModalButtonContainer}>
        <Button
          buttonStyle={{
            alignSelf: 'center',
            paddingHorizontal: '10%',
            marginRight: 10,
            backgroundColor: 'red',
          }}
          text={t('driverTrip.waitingDriver.reject')}
          onPress={onCancelTrip}
        />
        <Button
          buttonStyle={{
            alignSelf: 'center',
            paddingHorizontal: '10%',
            marginLeft: 10,
            backgroundColor: 'green',
          }}
          text={t('driverTrip.waitingDriver.accept')}
          onPress={onAcceptTrip}
        />
      </View>
    </>
  );
};

export default WaitingDriverAceptance;
