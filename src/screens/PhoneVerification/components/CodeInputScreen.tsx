import { random } from 'lodash';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/Button';
import { ROUTES } from '../../../constants/routes';
import { AppDispatch, ReduxState } from '../../../interfaces/redux';
import { setPhoneNumber as setPhoneNumberToFirebase, setPhoneVerificationCode } from '../../../redux/slices/profile';
import { checkPhoneVerification, sendPhoneVerification } from '../../../services/phone-verification';
import styles from './styles';

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
            screenNavigation.navigate(ROUTES.SET_PROFILE_SCREEN);
          } else {
            setInvalidCode(true);
          }
        }}
      />
      {invalidCode && <Text style={styles.error}>Incorrect code.</Text>}
      <Button
        buttonStyle={[styles.componentMargin, styles.buttonStyling]}
        text="Resend Code"
        onPress={async () => {
          const code = random(100000, 999999).toString();
          await dispatch(setPhoneVerificationCode({ code }));
          await sendPhoneVerification(phoneNumber, code);
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
