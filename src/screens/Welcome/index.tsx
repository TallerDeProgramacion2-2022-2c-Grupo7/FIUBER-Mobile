import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import Button from '../../components/Button';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { Container } from '../../layouts';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.WELCOME>;

function Welcome({ navigation }: Props) {
  const { t } = useTranslation();

  const onPressCreate = () => navigation.navigate(ROUTES.SIGNUP_SCREEN);

  const onPressLogin = () => navigation.navigate(ROUTES.LOGIN_SCREEN);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     if (auth().currentUser) {
  //       await dipatch(setUser(auth().currentUser?.toJSON()));
  //       navigation.navigate(ROUTES.HOME_SCREEN);
  //     }
  //   };
  //   checkUser();
  // }, []);

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
