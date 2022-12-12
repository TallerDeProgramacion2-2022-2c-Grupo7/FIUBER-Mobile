import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../../components/Button';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { Colors } from '../../../../../constants/theme';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import { clearTrip, setNearToDestination, setOnTheMove } from '../../../../../redux/slices/trip';
import { addRating } from '../../../../../services/rating';
import styles from '../../../styles';
import { IModalComponentArgs } from '..';

const TripFinished = ({
  modalRef,
  setAllwaysOpen,
  setOnClosed,
}: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const { cost, passangerId, id, driverId } = useSelector(
    (state: ReduxState) => state.trip
  );

  useEffect(() => {
    dispatch(setNearToDestination(false));
    setAllwaysOpen(undefined);
    setTimeout(() => {
      modalRef.current?.open();
    }, 100);
  }, []);

  useEffect(() => {
    setOnClosed(() => () => {
      dispatch(clearTrip());

      setTimeout(() => {
        modalRef.current?.open();
      }, 500);
    });
  }, []);

  useEffect(() => {
    dispatch(setOnTheMove(false));
  }, []);

  const ratingPassanger = (value: number) => {
    setRating(value);
    setConfirm(true);
  };

  const confirmRating = (): void => {
    addRating(id!, passangerId!, rating, driverId!);
    setConfirm(false);
    modalRef.current?.close();
  };

  const cancelRating = (): void => {
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
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Button
              buttonStyle={{
                alignSelf: 'center',
                paddingHorizontal: '10%',
                marginRight: 10,
                backgroundColor: 'red',
              }}
              text="Skip"
              onPress={cancelRating}
            />
            <Button
              buttonStyle={{
                alignSelf: 'center',
                paddingHorizontal: '10%',
                marginLeft: 10,
                backgroundColor: 'green',
              }}
              disabled={!confirm}
              text="Confirm"
              onPress={confirmRating}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default TripFinished;
