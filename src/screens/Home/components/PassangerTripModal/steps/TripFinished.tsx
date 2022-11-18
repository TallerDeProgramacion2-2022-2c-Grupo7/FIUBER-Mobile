import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { Colors } from '../../../../../constants/theme';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import { clearTrip } from '../../../../../redux/slices/trip';
import { addRating } from '../../../../../services/rating';
import styles from '../../../styles';
import { IModalComponentArgs } from '../index';

const TripFinished = ({ setOnClose, modalRef }: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cost, driver, driverId, id, passangerId } = useSelector(
    (state: ReduxState) => state.trip
  );
  const { t } = useTranslation();

  useEffect(() => {
    setOnClose(() => () => {
      dispatch(clearTrip());
    });
  }, []);

  const ratingDriver = (value: number) => {
    addRating(id, driverId, value, passangerId);
    modalRef.current?.close();
  };

  return (
    <>
      <Header
        center={
          <Text style={styles.ModalTitle} type="subtitle1">
            {t('passangerTrip.tripFinished.title')}
          </Text>
        }
      />
      <View style={styles.ModalContainer}>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">{t('passangerTrip.tripFinished.price')}</Text>
          <Text type="subtitle2">$ {cost?.toFixed(2)}</Text>
        </View>
        <View style={styles.ModalRating}>
          <Text type="subtitle2">
            {t('passangerTrip.tripFinished.raiting')}
          </Text>
          <Rating
            readonly
            tintColor={Colors.Black.Pure}
            startingValue={driver?.rating || 0}
            onFinishRating={ratingDriver}
          />
        </View>
      </View>
    </>
  );
};

export default TripFinished;
