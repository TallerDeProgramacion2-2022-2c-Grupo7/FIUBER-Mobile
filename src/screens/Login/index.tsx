import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button';
import KeyboardScrollView from '../../components/KeyboardScrollView';
import PasswordInput from '../../components/PasswordInput';
import SocialButton from '../../components/SocialButton';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { AppDispatch, ReduxState } from '../../interfaces/redux';
import { Container } from '../../layouts';
import { googleLogin, login } from '../../redux/slices/auth';
import { isValidEmail } from '../../utils';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.LOGIN_SCREEN>;
const MIN_PASSWORD_LENGTH = 6;

export const isValidPassword = (password: string) => {
  if (!password) {
    return false;
  }
  return password.trim() !== '' && password.length >= MIN_PASSWORD_LENGTH;
};

function Login({ navigation }: Props) {
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
    if (!isValidEmail(submittedEmail)) {
      onError('signup.invalidEmail');
      return;
    }
    await dispatch(
      login({ email: submittedEmail, password: submittedPassword, onError })
    );
  };

  const handleGoogleLogin = async () => {
    await dispatch(googleLogin());
  };

  useEffect(() => {
    if (logedIn) {
      navigation.navigate(ROUTES.TAB_SCREEN);
    }
  }, [logedIn]);

  return (
    <Container>
      <KeyboardScrollView contentStyle={styles.container}>
        <View>
          <Text style={styles.title}>{t('login.submit')}</Text>
        </View>
        <View style={[styles.emailInputContainer]}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
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
          text={t('login.submit')}
          onPress={() => handleSubmit(email, password)}
          loading={loading}
          buttonStyle={styles.buttonMargin}
        />
        <SocialButton
          text={t('login.google')}
          onLongPress={() => console.log('long press')}
          onPress={() => handleGoogleLogin()}
          iconStyle={styles.moreOptionsIcon}
          buttonStyle={[styles.buttonMargin, styles.moreOptionsButton]}
          buttonType={'google'}
          color={'#fff'}
        />
      </KeyboardScrollView>
    </Container>
  );
}

export default Login;
