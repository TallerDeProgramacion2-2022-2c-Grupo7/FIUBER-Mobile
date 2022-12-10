import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import { Bar as ProgressBarr } from 'react-native-progress';
import { Rating } from 'react-native-ratings';
import { useSelector } from 'react-redux';

import Button from '../../../../../components/Button';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { Colors } from '../../../../../constants/theme';
import useTripStatus from '../../../../../hooks/useTripStatus';
import { ReduxState } from '../../../../../interfaces/redux';
import { finishTrip } from '../../../../../services/trips';
import styles from '../../../styles';

const TripInCourse = ({}: { modalRef: React.RefObject<IHandles> }) => {
  const { driver, id, nearToDestination, to, cost } = useSelector(
    (state: ReduxState) => state.trip
  );
  const { t } = useTranslation();

  useTripStatus();

  const onFinishTrip = () => {
    if (!id) {
      return;
    }
    finishTrip(id);
  };

  return (
    <>
      <Header
        center={
          <Text style={styles.ModalTitle} type="subtitle1">
            {t('passangerTrip.tripInCourse.title')}
          </Text>
        }
      />
      <View style={styles.ModalContainer}>
        <>
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
        </>
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
            {driver?.firstName} {driver?.lastName}{' '}
          </Text>
        </View>
        {driver?.rating && (driver?.rating != -1) &&(
          <View style={styles.ModalRating}>
            <Text type="subtitle2">
              {t('passangerTrip.driverAccept.driverRating')}
            </Text>
            <Rating
              readonly
              tintColor={Colors.Black.Pure}
              startingValue={driver?.rating || 0}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default TripInCourse;
