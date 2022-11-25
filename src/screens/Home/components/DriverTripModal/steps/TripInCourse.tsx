/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Bar as ProgressBarr } from 'react-native-progress';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../../components/Button';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { Colors } from '../../../../../constants/theme';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import { reloadTrip } from '../../../../../redux/slices/trip';
import { finishTrip } from '../../../../../services/trips';
import styles from '../../../styles';
import { IModalComponentArgs } from '..';

const TripInCourse = ({
  setAllwaysOpen,
  setOnClose,
  setOnClosed,
}: IModalComponentArgs) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { to, id, passsanger, cost, nearToDestination } = useSelector(
    (state: ReduxState) => state.trip
  );

  useEffect(() => {
    setAllwaysOpen(130);
    setOnClose(() => () => {});
    setOnClosed(() => () => {});
  }, []);

  useEffect(() => {
    dispatch(reloadTrip());
  }, []);

  const onFinishTrip = () => {
    if (id) {
      finishTrip(id);
    }
  };

  return (
    <>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            {t('driverTrip.tripInCourse.title')}
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
              text={t('driverTrip.tripInCourse.finish')}
              onPress={onFinishTrip}
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
      <View style={styles.ModalContainer}>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">{t('driverTrip.tripInCourse.to')}</Text>
          <Text type="subtitle2">
            {' '}
            {to?.description?.formattedAddress.mainText}{' '}
          </Text>
        </View>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">{t('driverTrip.tripInCourse.price')}</Text>
          <Text type="subtitle2">$ {cost?.toFixed(2)}</Text>
        </View>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">{t('driverTrip.tripInCourse.passanger')}</Text>
          <Text type="subtitle2">
            {' '}
            {passsanger?.firstName} {passsanger?.lastName}{' '}
          </Text>
        </View>
        {passsanger?.rating && (
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

export default TripInCourse;
