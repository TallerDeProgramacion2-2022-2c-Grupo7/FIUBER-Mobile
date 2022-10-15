import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/Button';
import { AppDispatch, ReduxState } from '../../../interfaces/redux';
import { setPhoneNumber as setPhoneNumberToFirebase } from '../../../redux/slices/profile';
import { checkPhoneVerification } from '../../../services/phone-verification';
import styles from './styles';

const CodeInputScreen = ({
  phoneNumber,
  setPhoneNumber,
}: {
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: string | null) => void;
}) => {
  const [invalidCode, setInvalidCode] = useState(false);
  const { user } = useSelector((state: ReduxState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <SafeAreaView style={styles.codeInputWrapper}>
      <OTPInputView
        style={{ width: '80%', height: 200 }}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={async code => {
          console.log('VERIFICATION CODE: ', code);
          if (await checkPhoneVerification(user?.uid, code)) {
            if (!phoneNumber) {
              return;
            }
            return dispatch(setPhoneNumberToFirebase({ phoneNumber }));
          }
          setInvalidCode(true);
        }}
      />
      {invalidCode && <Text style={styles.error}>Incorrect code.</Text>}
      <Button
        buttonStyle={[styles.componentMargin, styles.buttonStyling]}
        text="Resend Code"
        onPress={() => {
          console.log('Resending');
        }}
      />
      <Button
        buttonStyle={[styles.componentMargin, styles.secondButtonStyling]}
        text="Change Phone Number"
        onPress={() => {
          console.log('Changing screen');
          setPhoneNumber(null);
        }}
      />
    </SafeAreaView>
  );
};

export default CodeInputScreen;
