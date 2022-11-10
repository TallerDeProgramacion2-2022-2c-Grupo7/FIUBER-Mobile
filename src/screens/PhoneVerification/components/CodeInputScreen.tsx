import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/Button';
import { AppDispatch, ReduxState } from '../../../interfaces/redux';
import { setPhoneNumber as setPhoneNumberToFirebase } from '../../../redux/slices/profile';
import { checkPhoneVerification } from '../../../services/phone-verification';
import styles from './styles';
import { ROUTES } from '../../../constants/routes';

const CodeInputScreen = ({
  phoneNumber,
  setPhoneNumber,
  screenNavigation,
}: {
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: string | null) => void;
  screenNavigation: any;
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
            await dispatch(setPhoneNumberToFirebase({ phoneNumber }));
            //TODO pasar por parametros el phoneNumber y el code
            screenNavigation.navigate(ROUTES.SET_PROFILE_SCREEN);
          }
          else {
            setInvalidCode(true);
          }
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
