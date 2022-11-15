import { random } from 'lodash';
import React, { useRef } from 'react';
import PhoneInput from 'react-native-phone-number-input';
import { useDispatch } from 'react-redux';

import Button from '../../../components/Button';
import { AppDispatch } from '../../../interfaces/redux';
import { setPhoneVerificationCode } from '../../../redux/slices/profile';
import { sendPhoneVerification } from '../../../services/phone-verification';
import styles from './styles';

const PhoneInputScreen = ({
  phoneNumber,
  setPhoneNumber,
}: {
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: string | null) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const phoneInput = useRef<PhoneInput>(null);
  const [formattedValue, setFormattedValue] = React.useState('');
  const [value, setValue] = React.useState('');

  return (
    <>
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="AR"
        layout="first"
        onChangeText={text => {
          setValue(text);
        }}
        onChangeFormattedText={text => {
          setFormattedValue(text);
        }}
        countryPickerProps={{ withAlphaFilter: true }}
        autoFocus
        containerStyle={styles.containerStyle}
        textContainerStyle={styles.textContainerStyle}
        textInputStyle={{
          ...styles.textStyling,
          flexGrow: 1,
          flex: 1,
        }}
        codeTextStyle={{
          ...styles.textStyling,
        }}
      />
      <Button
        text="Validate"
        buttonStyle={[styles.componentMargin, styles.buttonStyling]}
        onPress={() => {
          const code = random(100000, 999999).toString();
          setPhoneNumber(formattedValue);
          dispatch(setPhoneVerificationCode({ code }));
          sendPhoneVerification(formattedValue, code);
        }}
      />
    </>
  );
};

export default PhoneInputScreen;
