import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import { Bar as ProgressBarr } from 'react-native-progress';
import { useSelector } from 'react-redux';

import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import useTripStatus from '../../../../../hooks/useTripStatus';
import { ReduxState } from '../../../../../interfaces/redux';
import styles from '../../../styles';

const WaitingForDriver = ({}: { modalRef: React.RefObject<IHandles> }) => {
  const { to, cost } = useSelector((state: ReduxState) => state.trip);
  const { t } = useTranslation();

  useTripStatus();

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
