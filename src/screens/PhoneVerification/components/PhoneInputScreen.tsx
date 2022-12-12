import { random } from 'lodash';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useDispatch } from 'react-redux';

import Button from '../../../components/Button';
import Text from '../../../components/Text';
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
  const DIGITS_WITH_CODE_AREA = 14;
  const dispatch = useDispatch<AppDispatch>();
  const phoneInput = useRef<PhoneInput>(null);
  const [formattedValue, setFormattedValue] = React.useState('');
  const [value, setValue] = React.useState('');
  const [isError, setIsError] = useState(false);
  const { t } = useTranslation();

  const isValid = (number: string) => {
    return number.length === DIGITS_WITH_CODE_AREA;
  };

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
      <View style={styles.styleError}>
        {isError === true ? (
          <Text style={styles.errorText}>
            {t('validations.phoneNumberLengthIncorrect')}
          </Text>
        ) : null}
      </View>
      <Button
        text="Validate"
        buttonStyle={[styles.componentMargin, styles.buttonStyling]}
        onPress={async () => {
          const code = random(100000, 999999).toString();
          if (!isValid(formattedValue)) {
            setIsError(true);
            return;
          }
          setPhoneNumber(formattedValue);
          await dispatch(setPhoneVerificationCode({ code }));
          setIsError(false);
          await sendPhoneVerification(formattedValue, code);
        }}
      />
    </>
  );
};

export default PhoneInputScreen;
