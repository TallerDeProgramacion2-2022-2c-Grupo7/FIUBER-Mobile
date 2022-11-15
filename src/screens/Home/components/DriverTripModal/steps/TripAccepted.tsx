/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Bar as ProgressBarr } from 'react-native-progress';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../../components/Button';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import { setOnTheMove } from '../../../../../redux/slices/trip';
import { start } from '../../../../../services/trips';
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
          <Text style={{ marginTop: 20 }} type="subtitle1">
            {t('driverTrip.tripAccepted.title')}
          </Text>
        }
      />
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
      <View style={styles.modalContainer}>
        <Text type="subtitle2">
          {t('driverTrip.tripAccepted.passangerDirection')}
        </Text>
        <Text type="subtitle2">
          {' '}
          {to?.description?.formattedAddress.mainText}{' '}
        </Text>
      </View>
      <View style={styles.modalContainer}>
        <Text type="subtitle2">{t('driverTrip.tripAccepted.price')}</Text>
        <Text type="subtitle2">$ {cost?.toFixed(2)}</Text>
      </View>
      <View style={styles.modalContainer}>
        <Text type="subtitle2">{t('driverTrip.tripAccepted.passanger')}</Text>
        <Text type="subtitle2">
          {' '}
          {passsanger?.firstName} {passsanger?.lastName}{' '}
        </Text>
      </View>
      <View style={styles.modalContainer}>
        <Text type="subtitle2">{t('driverTrip.tripAccepted.raiting')}</Text>
        <Text type="subtitle2">
          {' '}
          {passsanger?.firstName} {passsanger?.lastName}{' '}
        </Text>
      </View>
    </>
  );
};

export default TripAccepted;

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    flex: 1,
    flexDirection: 'row',
  },
});
