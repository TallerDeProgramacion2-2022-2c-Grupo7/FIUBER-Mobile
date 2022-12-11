import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../../components/Button';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import { AppDispatch, ReduxState } from '../../../../../interfaces/redux';
import {
  createNewTrip,
  obtainCalculatedCost,
  setTo,
} from '../../../../../redux/slices/trip';
import styles from '../../../styles';

const WaitingUserAceptance = ({
  modalRef,
}: {
  modalRef: React.RefObject<IHandles>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cost, from, to } = useSelector((state: ReduxState) => state.trip);
  const { t } = useTranslation();

  useEffect(() => {
    if (!from || !to) {
      return;
    }
    dispatch(
      obtainCalculatedCost({
        from: from.coordinates,
        to: to.coordinates,
      })
    );
  }, [from, to]);

  useEffect(() => {
    if (cost) {
      modalRef.current?.open();
    }
  }, [cost]);

  const onAcceptTrip = async () => {
    if (from && to) {
      dispatch(createNewTrip({ from, to }));
    }
  };

  const onCancelTrip = async () => {
    dispatch(setTo(null));
    modalRef.current?.close();
  };

  return (
    <>
      <Header
        center={
          <Text style={styles.ModalTitle} type="subtitle1">
            {t('passangerTrip.waitingUserAceptance.title')}
          </Text>
        }
      />
      <View style={styles.ModalContainer}>
        <Text type="subtitle2">
          {t('passangerTrip.waitingUserAceptance.price')}{' '}
        </Text>
        <Text type="subtitle2">$ {cost?.toFixed(2)}</Text>
      </View>
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
            marginRight: 10,
            backgroundColor: 'red',
          }}
          text={t('passangerTrip.waitingUserAceptance.reject')}
          onPress={onCancelTrip}
        />
        <Button
          buttonStyle={{
            alignSelf: 'center',
            paddingHorizontal: '10%',
            marginLeft: 10,
            backgroundColor: 'green',
          }}
          text={t('passangerTrip.waitingUserAceptance.accept')}
          onPress={onAcceptTrip}
        />
      </View>
    </>
  );
};

export default WaitingUserAceptance;
