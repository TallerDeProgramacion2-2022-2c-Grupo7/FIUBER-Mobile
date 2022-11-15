/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import { clearTrip, setOnTheMove } from '../../../../../redux/slices/trip';
import { IModalComponentArgs } from '..';

const TripFinished = ({
  modalRef,
  setAllwaysOpen,
  setOnClose,
  setOnClosed,
}: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { cost, status } = useSelector((state: ReduxState) => state.trip);

  useEffect(() => {
    setAllwaysOpen(undefined);
    setTimeout(() => {
      modalRef.current?.open();
    }, 100);
  }, []);

  useEffect(() => {
    setOnClose(() => async () => {
      await dispatch(clearTrip());
    });
  }, []);

  useEffect(() => {
    setOnClosed(() => () => {
      setTimeout(() => {
        modalRef.current?.open();
      }, 500);
    });
  }, []);

  useEffect(() => {
    dispatch(setOnTheMove(false));
  }, []);

  return (
    <>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            {t('driverTrip.tripFinished.title')}
          </Text>
        }
      />
      <View style={styles.modalContainer}>
        <Text type="subtitle2">{t('driverTrip.tripFinished.price')}</Text>
        <Text type="subtitle2">$ {cost?.toFixed(2)}</Text>
      </View>
      <View style={styles.modalContainer}>
        <Text type="subtitle2">{t('driverTrip.tripFinished.raiting')}</Text>
      </View>
    </>
  );
};

export default TripFinished;

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    flex: 1,
    flexDirection: 'row',
  },
});
