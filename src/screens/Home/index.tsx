import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { ReduxState } from '../../interfaces/redux';
import { Container } from '../../layouts';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.HOME_SCREEN>;

function Home({ navigation }: Props) {
  const { t } = useTranslation();
  const { user } = useSelector((state: ReduxState) => state.auth);

  const title = t('home.title');
  const email = t('home.email');

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{`${email}: ${user.email} `}</Text>
      </View>
    </Container>
  );
}

export default Home;
