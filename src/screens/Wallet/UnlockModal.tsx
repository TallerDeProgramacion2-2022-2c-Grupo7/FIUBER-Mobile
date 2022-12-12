import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import { Colors } from '../../constants/theme';
import { ReduxState } from '../../interfaces/redux';
import { getUnlockStatus, unlockWalletFunds } from '../../services/wallet';

interface Props {
  modalRef: React.RefObject<Modalize>;
  paramOnClose?: () => void;
}

function UnlockModal({ modalRef, paramOnClose }: Props) {
  const { locked } = useSelector((state: ReduxState) => state.wallet);
  const { user } = useSelector((state: ReduxState) => state.auth);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [waiting, setWaiting] = useState(true);

  const unlockFunds = async () => {
    if (!user?.uid || !locked || locked === 0) {
      return;
    }
    const tx = await unlockWalletFunds(user.uid, locked);

    return tx.hash;
  };

  const onOpen = async () => {
    const hash = await unlockFunds();

    const interval = setInterval(async () => {
      const status = await getUnlockStatus(hash);
      if (status === 'minted') {
        setWaiting(false);
      }
    }, 5000);
    setIntervalId(interval);
  };

  useEffect(() => {
    if (!waiting && intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  }, [waiting]);

  const onClose = () => {
    if (paramOnClose) {
      paramOnClose();
    }
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      setWaiting(true);
    }
  };

  return (
    <Modal
      onOpen={onOpen}
      onClose={onClose}
      modalStyle={styles.Modal}
      adjustToContentHeight
      modalRef={modalRef}
      onBackButtonPress={() => {
        return true;
      }}>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            Unlock
          </Text>
        }
      />
      <View style={styles.ModalContainer}>
        {waiting ? (
          <ActivityIndicator size={50} />
        ) : (
          <View style={styles.ModalTextContainer}>
            <FontAwesome5Icon
              name="check-circle"
              size={50}
              color={Colors.ActionBlue}
            />
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  Modal: {
    backgroundColor: Colors.Gray.Secondary,
  },
  ModalContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  ModalTextContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    justifyContent: 'center',
  },
});

export default UnlockModal;
