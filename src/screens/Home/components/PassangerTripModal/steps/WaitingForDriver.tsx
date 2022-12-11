import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import { Bar as ProgressBarr } from 'react-native-progress';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { ReduxState } from '../../../../../interfaces/redux';
import { clearTrip } from '../../../../../redux/slices/trip';
import { cancelTrip } from '../../../../../services/trips';
import styles from '../../../styles';
import { IModalComponentArgs } from '..';

const WaitingForDriver = ({ setOnClosed }: IModalComponentArgs) => {
  const { to, cost, id } = useSelector((state: ReduxState) => state.trip);
  const { t } = useTranslation();
  const dispatch = useDispatch<A>();

  useEffect(() => {
    setOnClosed(() => () => {
      if (id) {
        dispatch(clearTrip());
        cancelTrip(id!);
      }
    });
    return () => {
      setOnClosed(undefined);
    };
  }, []);

  return (
    <>
      <Header
        center={
          <Text style={styles.ModalTitle} type="subtitle1">
            {t('passangerTrip.waitingForDriver.title')}
          </Text>
        }
      />
      <View style={styles.ModalContainer}>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">{t('passangerTrip.waitingForDriver.to')}</Text>
          <Text type="subtitle2">
            {to?.description?.formattedAddress.mainText || ''}
          </Text>
        </View>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">
            {t('passangerTrip.waitingForDriver.price')}
          </Text>
          <Text type="subtitle2">$ {cost?.toFixed(2)}</Text>
        </View>
      </View>
      <View>
        <ProgressBarr
          indeterminate={true}
          borderWidth={0}
          width={null}
          indeterminateAnimationDuration={2000}
        />
      </View>
    </>
  );
};

export default WaitingForDriver;
