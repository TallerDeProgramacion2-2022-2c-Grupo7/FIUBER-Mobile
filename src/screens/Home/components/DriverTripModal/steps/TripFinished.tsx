import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { Colors } from '../../../../../constants/theme';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import { clearTrip, setOnTheMove } from '../../../../../redux/slices/trip';
import { addRating } from '../../../../../services/rating';
import styles from '../../../styles';
import { IModalComponentArgs } from '..';

const TripFinished = ({
  modalRef,
  setAllwaysOpen,
  setOnClose,
  setOnClosed,
}: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { cost, passangerId } = useSelector((state: ReduxState) => state.trip);

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

  const ratingPassanger = (value: number) => {
    addRating(passangerId!, value);
    modalRef.current?.close();
  };

  return (
    <>
      <Header
        center={
          <Text style={styles.title} type="subtitle1">
            {t('driverTrip.tripFinished.title')}
          </Text>
        }
      />
      <View style={styles.ModalContainer}>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">{t('driverTrip.tripFinished.price')}</Text>
          <Text type="subtitle2">$ {cost?.toFixed(2)}</Text>
        </View>
        <View style={styles.ModalRating}>
          <Text type="subtitle2">{t('driverTrip.tripFinished.rating')}</Text>
          <Rating
            tintColor={Colors.Black.Pure}
            onFinishRating={ratingPassanger}
          />
        </View>
      </View>
    </>
  );
};

export default TripFinished;
