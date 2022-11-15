import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import { clearTrip } from '../../../../../redux/slices/trip';
import styles from '../../../styles';
import { IModalComponentArgs } from '../index';

const TripFinished = ({ setOnClose }: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cost } = useSelector((state: ReduxState) => state.trip);
  const { t } = useTranslation();

  useEffect(() => {
    setOnClose(() => () => {
      dispatch(clearTrip());
    });
  }, []);

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
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">
            {t('passangerTrip.tripFinished.raiting')}
          </Text>
        </View>
      </View>
    </>
  );
};

export default TripFinished;
