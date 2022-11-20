import auth from '@react-native-firebase/auth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Button from '../../components/Button';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { AppDispatch } from '../../interfaces/redux';
import { Container } from '../../layouts';
import { setUser } from '../../redux/slices/auth';
import { getMyProfile } from '../../redux/slices/profile';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.WELCOME>;

function Welcome({ navigation }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const onPressCreate = () => navigation.navigate(ROUTES.SIGNUP_SCREEN);

  const onPressLogin = () => navigation.navigate(ROUTES.LOGIN_SCREEN);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await dispatch(setUser(currentUser.toJSON()));
        await dispatch(getMyProfile({ uid: currentUser.uid }));
        navigation.navigate(ROUTES.TAB_SCREEN);
      }
    };
    checkUser();
  }, []);

  const title = t('welcome.title');
  const importTitle = t('welcome.login');
  const createTitle = t('welcome.create');

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Button
          buttonStyle={[styles.componentMargin, styles.buttonStyling]}
          text={createTitle}
          onPress={onPressCreate}
        />
        <Button
          buttonStyle={[styles.componentMargin, styles.buttonStyling]}
          text={importTitle}
          onPress={onPressLogin}
        />
      </View>
    </Container>
  );
}

export default Welcome;
