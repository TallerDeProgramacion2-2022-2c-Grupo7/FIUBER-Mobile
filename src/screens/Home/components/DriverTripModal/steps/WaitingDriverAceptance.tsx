import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../../components/Button';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import {
  clearTrip,
  fetchPassangerProfile,
  goToTripFrom,
} from '../../../../../redux/slices/trip';
import { accept, reject } from '../../../../../services/trips';
import { IModalComponentArgs } from '../../DriverTripModal';

const WaitingDriverAceptance = ({
  setAllwaysOpen,
  setOnClose,
  setOnClosed,
  modalRef,
}: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { cost, id, from, to, passsanger } = useSelector(
    (state: ReduxState) => state.trip
  );

  useEffect(() => {
    setAllwaysOpen(150);
  }, []);

  useEffect(() => {
    setOnClose(() => () => {
      if (id) {
        reject(id);
      }
      dispatch(clearTrip());
    });
  }, []);

  useEffect(() => {
    setOnClosed(() => () => {
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
      await dispatch(goToTripFrom({}));
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
      <View style={styles.modalContainer}>
        <Text type="subtitle2">{t('driverTrip.waitingDriver.price')}</Text>
        <Text type="subtitle2">$ {cost?.toFixed(2)}</Text>
      </View>
      <View style={styles.modalContainer}>
        <Text type="subtitle2">{t('driverTrip.waitingDriver.from')}</Text>
        <Text type="subtitle2">
          {' '}
          {from?.description?.formattedAddress.mainText}{' '}
        </Text>
      </View>
      <View style={styles.modalContainer}>
        <Text type="subtitle2">{t('driverTrip.waitingDriver.to')}</Text>
        <Text type="subtitle2">
          {' '}
          {to?.description?.formattedAddress.mainText}{' '}
        </Text>
      </View>
      <View style={styles.modalContainer}>
        <Text type="subtitle2">{t('driverTrip.waitingDriver.passanger')}</Text>
        <Text type="subtitle2">
          {' '}
          {passsanger?.firstName} {passsanger?.lastName}{' '}
        </Text>
      </View>
      <View style={styles.modalContainer}>
        <Text type="subtitle2">{t('driverTrip.waitingDriver.raiting')}</Text>
        <Text type="subtitle2">
          {' '}
          {passsanger?.firstName} {passsanger?.lastName}{' '}
        </Text>
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

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    flex: 1,
    flexDirection: 'row',
  },
});
