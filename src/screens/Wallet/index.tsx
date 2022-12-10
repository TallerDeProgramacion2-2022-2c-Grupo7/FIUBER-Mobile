import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';

import FontAwesomeButton from '../../components/FontAwesomeButton';
import Text from '../../components/Text';
import { Colors } from '../../constants/theme';
import { AppDispatch, ReduxState } from '../../interfaces/redux';
import { updateBalance, updateLocked } from '../../redux/slices/wallet';
import DepositModal from './DepositModal';
import styles from './styles';
import UnlockModal from './UnlockModal';

function Wallet() {
  const dispatch = useDispatch<AppDispatch>();
  const { balance, init, locked } = useSelector(
    (state: ReduxState) => state.wallet
  );
  const { user } = useSelector((state: ReduxState) => state.auth);
  const [updatingBalance, setUpdatingBalance] = useState(false);
  const depositModalRef = useRef<Modalize>(null);
  const unlockModalRef = useRef<Modalize>(null);

  useEffect(() => {
    handleRefresh();
  }, [init, user]);

  const handleRefresh = async () => {
    setUpdatingBalance(true);
    await dispatch(updateBalance());
    await dispatch(updateLocked());
    setUpdatingBalance(false);
  };

  const onUnlocked = () => {
    handleRefresh();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      overScrollMode="never"
      refreshControl={
        <RefreshControl
          onRefresh={handleRefresh}
          tintColor={Colors.White.Primary}
          refreshing={updatingBalance}
        />
      }>
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text style={styles.title}>Wallet Balance</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'column' }}>
            {updatingBalance ? (
              <Text style={styles.balance}>-</Text>
            ) : (
              <Text style={styles.balance}>
                {balance !== undefined ? balance.toFixed(5) : '-'}
              </Text>
            )}
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.title} type="subtitle1">
              ETH
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: -40,
          }}>
          <View
            style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Text style={styles.subtitle}>Locked</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-end',
              paddingVertical: 20,
            }}>
            <View style={{ flexDirection: 'row' }}>
              {updatingBalance ? (
                <Text style={styles.subtitle}>-</Text>
              ) : (
                <Text style={styles.subtitle}>
                  {locked !== undefined ? locked.toFixed(5) : '-'}
                </Text>
              )}
              <Text style={styles.subtitle}>ETH</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 30,
            justifyContent: 'space-around',
          }}>
          <View style={{ flexDirection: 'column' }}>
            <FontAwesomeButton
              iconName="arrow-down"
              text="Deposit"
              onPress={() => depositModalRef.current?.open()}
              textStyle={{ color: 'white', alignSelf: 'center' }}
              iconProps={{ color: 'white', size: 30 }}
              buttonStyle={{ backgroundColor: 'transparent' }}
            />
          </View>
          <View style={{ flexDirection: 'column' }}>
            <FontAwesomeButton
              iconName="unlock"
              text="Unlock"
              onPress={() => unlockModalRef.current?.open()}
              textStyle={{ color: 'white', alignSelf: 'center' }}
              iconProps={{ color: 'white', size: 30 }}
              buttonStyle={{ backgroundColor: 'transparent' }}
            />
          </View>
        </View>
        <DepositModal modalRef={depositModalRef} />
        <UnlockModal modalRef={unlockModalRef} paramOnClose={onUnlocked} />
      </SafeAreaView>
    </ScrollView>
  );
}

export default Wallet;
