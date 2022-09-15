import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { AppDispatch, ReduxState } from '../../interfaces/redux';
import { Container } from '../../layouts';
import { logout } from '../../redux/slices/auth';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.HOME_SCREEN>;

function Home({ navigation }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: ReduxState) => state.auth);

  const title = t('home.title');
  const email = t('home.email');

  const handleLogout = async () => {
    navigation.navigate(ROUTES.WELCOME);
    await dispatch(logout());
  };

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{`${email}: ${user?.email} `}</Text>
        <Button onPress={handleLogout} text="Logout" />
      </View>
    </Container>
  );
}

export default Home;
