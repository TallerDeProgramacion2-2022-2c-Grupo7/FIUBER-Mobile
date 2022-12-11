import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import TouchableText from '../../components/TouchableText';
import { Colors } from '../../constants/theme';
import { ReduxState } from '../../interfaces/redux';

interface Props {
  modalRef: React.RefObject<Modalize>;
}

function DepositModal({ modalRef }: Props) {
  const { publicKey } = useSelector((state: ReduxState) => state.wallet);

  return (
    <Modal
      modalStyle={styles.Modal}
      adjustToContentHeight
      modalRef={modalRef}
      onBackButtonPress={() => {
        return true;
      }}>
      <Header
        center={
          <Text style={{ marginTop: 20 }} type="subtitle1">
            Deposit
          </Text>
        }
      />
      <View style={styles.ModalContainer}>
        <View style={styles.ModalTextContainer}>
          <Text type="subtitle2">
            Para realizar un deposito envie ETH a esta direccion
          </Text>
        </View>

        <TouchableText text={publicKey} cutText copyable />
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
  },
});

export default DepositModal;
