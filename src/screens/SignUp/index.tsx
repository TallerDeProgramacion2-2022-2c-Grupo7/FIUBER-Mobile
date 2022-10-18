import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button';
import KeyboardScrollView from '../../components/KeyboardScrollView';
import PasswordInput from '../../components/PasswordInput';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { AppDispatch, ReduxState } from '../../interfaces/redux';
import { Container } from '../../layouts';
import { signup } from '../../redux/slices/auth';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.SIGNUP_SCREEN>;
const MIN_PASSWORD_LENGTH = 8;

export const isValidPassword = (password: string) => {
  if (!password) {
    return false;
  }
  return password.trim() !== '' && password.length >= MIN_PASSWORD_LENGTH;
};

function SignUp({ navigation }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { logedIn } = useSelector((state: ReduxState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const [disableInput, setDisableInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const onError = (error: string) => {
    setLoading(false);
    setDisableInput(false);
    setLoginError(error);
  };

  const handleSubmit = async (
    submittedEmail: string,
    submittedPassword: string
  ) => {
    setLoading(true);
    setDisableInput(true);
    await dispatch(
      signup({ email: submittedEmail, password: submittedPassword, onError })
    );
  };

  useEffect(() => {
    if (logedIn) {
      navigation.navigate(ROUTES.PHONE_VERIFICATION_SCREEN); //ROUTES.HOME_SCREEN
    }
  }, [logedIn]);

  return (
    <Container>
      <KeyboardScrollView contentStyle={styles.container}>
        <View>
          <Text style={styles.title}>{t('signup.title')}</Text>
        </View>
        <View style={[styles.emailInputContainer]}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            contentContainerStyle={styles.emailInput}
            placeholder={t('common.enterEmail')}
            inputStyle={styles.emailTextInput}
          />
        </View>
        <PasswordInput
          error={loginError}
          disabled={disableInput}
          value={password}
          onChangeText={setPassword}
          onSubmit={() => handleSubmit(email, password)}
        />
        <Button
          disabled={!isValidPassword(password)}
          text={t('signup.submit')}
          onPress={() => handleSubmit(email, password)}
          loading={loading}
          buttonStyle={styles.buttonMargin}
        />
        <Button
          text={t('signup.moreOptions')}
          onLongPress={() => console.log('long press')}
          onPress={() => console.log('press')}
          iconStyle={styles.moreOptionsIcon}
          buttonStyle={[styles.buttonMargin, styles.moreOptionsButton]}
        />
      </KeyboardScrollView>
    </Container>
  );
}

export default SignUp;
