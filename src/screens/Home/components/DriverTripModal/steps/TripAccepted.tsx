/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Bar as ProgressBarr } from 'react-native-progress';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import Button from '../../../../../components/Button';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { Colors } from '../../../../../constants/theme';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import { setOnTheMove } from '../../../../../redux/slices/trip';
import { start } from '../../../../../services/trips';
import styles from '../../../styles';
import { IModalComponentArgs } from '..';

const TripAccepted = ({
  setAllwaysOpen,
  setOnClose,
  setOnClosed,
  modalRef,
}: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { cost, to, passsanger, nearToDestination, id } = useSelector(
    (state: ReduxState) => state.trip
  );

  useEffect(() => {
    messaging().unsubscribeFromTopic('availableTrips')
      .then(() => console.log('Unsubscribed fom the topic availableTrips'));

    setAllwaysOpen(150);
    setOnClose(() => () => {});
    setOnClosed(() => () => {});
    modalRef.current?.open();
  }, []);

  useEffect(() => {
    dispatch(setOnTheMove(true));
  }, []);

  const onStartTrip = () => {
    if (id) {
      start(id);
    }
  };

  return (
    <>
      <Header
        center={
          <Text style={styles.ModalTitle} type="subtitle1">
            {t('driverTrip.tripAccepted.title')}
          </Text>
        }
      />
      <View style={styles.ModalContainer}>
        <View>
          {nearToDestination ? (
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
                text={t('driverTrip.tripAccepted.start')}
                onPress={onStartTrip}
              />
            </View>
          ) : (
            <ProgressBarr
              indeterminate={true}
              borderWidth={0}
              width={null}
              indeterminateAnimationDuration={2000}
            />
          )}
        </View>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">
            {t('driverTrip.tripAccepted.passangerDirection')}
          </Text>
          <Text type="subtitle2">
            {' '}
            {to?.description?.formattedAddress.mainText}{' '}
          </Text>
        </View>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">{t('driverTrip.tripAccepted.price')}</Text>
          <Text type="subtitle2">$ {cost?.toFixed(2)}</Text>
        </View>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">{t('driverTrip.tripAccepted.passanger')}</Text>
          <Text type="subtitle2">
            {' '}
            {passsanger?.firstName} {passsanger?.lastName}{' '}
          </Text>
        </View>
        {passsanger?.rating && (passsanger?.rating != -1) && (
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
    </>
  );
};

export default TripAccepted;
