import React, { useEffect, useState } from 'react';
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
import Button  from '../../../../../components/Button'

const TripFinished = ({ setOnClose, modalRef }: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cost, driver, driverId, id, passangerId } = useSelector(
    (state: ReduxState) => state.trip
  );
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    setOnClose(() => () => {
      dispatch(clearTrip());
    });
  }, []);

  const ratingDriver = (value: number) => {
    setRating(value);
    setConfirm(true);
  };

  const confirmRating =(): void => {
    addRating(id, driverId, rating, passangerId);
    setConfirm(false);
    modalRef.current?.close();
  }

  const cancelRating =(): void => {
    modalRef.current?.close();
  }

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
            tintColor={Colors.Black.Pure}
            startingValue={driver?.rating || 0}
            onFinishRating={ratingDriver}
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
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
