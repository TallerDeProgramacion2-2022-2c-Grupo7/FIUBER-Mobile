import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { Container } from '../../layouts';
import CodeInputScreen from './components/CodeInputScreen';
import PhoneInputScreen from './components/PhoneInputScreen';
import styles from './styles';

type Props = NativeStackScreenProps<
  RootStackParamList,
  ROUTES.PHONE_VERIFICATION_SCREEN
>;

function PhoneVerification({navigation}: Props) {
  const [phoneNumber, setPhoneNumber] = React.useState<string | null>('');
  return (
    <>
      <Container>
        <View style={styles.container}>
          <SafeAreaView style={styles.wrapper}>
            {phoneNumber ? (
              <CodeInputScreen
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                screenNavigation={navigation}
              />
            ) : (
              <PhoneInputScreen
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
            )}
          </SafeAreaView>
        </View>
      </Container>
    </>
  );
}

export default PhoneVerification;
