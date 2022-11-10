import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button';
import KeyboardScrollView from '../../components/KeyboardScrollView';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { Profile } from '../../interfaces/profile';
import { AppDispatch, ReduxState } from '../../interfaces/redux';
import { Container } from '../../layouts';
import { update } from '../../redux/slices/profile';
import styles from './styles';

type Props = NativeStackScreenProps<
  RootStackParamList,
  ROUTES.SET_PROFILE_SCREEN
>;

const isValidProfile = (profile?: Profile) => {
  if (!profile) {
    return false;
  }
  return profile.firstName && profile.lastName;
};

function SetProfile({ navigation }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { logedIn, user } = useSelector((state: ReduxState) => state.auth);
  const { profile } = useSelector((state: ReduxState) => state.profile);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isDriver, setIsDriver] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!logedIn) {
      navigation.navigate(ROUTES.WELCOME);
    }
  }, [logedIn]);

  useEffect(() => {
    if (logedIn && profile) {
      navigation.navigate(ROUTES.HOME_SCREEN);
    }
  }, [logedIn, profile]);

  const generateProfile = (): Profile | undefined => {
    if (user && user.email) {
      return {
        firstName,
        lastName,
        email: user.email,
        isDriver: false,
        verifiedPhone: true,
      };
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (user && user.email) {
      const generatedProfile = generateProfile();
      if (!generatedProfile) {
        return;
      }
      if (!isDriver) {
        await dispatch(
          update({
            uid: user.uid,
            profile: generatedProfile,
          })
        );
      } else {
        navigation.navigate(ROUTES.SET_DRIVER_PROFILE_SCREEN, {
          commonProfile: generatedProfile,
        });
      }
    }
    setLoading(false);
  };

  return (
    <Container>
      <KeyboardScrollView contentStyle={styles.container}>
        <View>
          <Text style={styles.title}>{t('setProfile.title')}</Text>
        </View>
        <View style={[styles.textInputContainer]}>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            contentContainerStyle={styles.textInput}
            placeholder={t('common.firstName')}
            inputStyle={styles.text}
          />
        </View>

        <View style={[styles.textInputContainer]}>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            contentContainerStyle={styles.textInput}
            placeholder={t('common.lastName')}
            inputStyle={styles.text}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.text}>{t('common.isDriver')}</Text>
          <Switch onValueChange={setIsDriver} value={isDriver} />
        </View>
        <Button
          disabled={!isValidProfile(generateProfile())}
          text={isDriver ? t('setProfile.continue') : t('setProfile.submit')}
          onPress={handleSubmit}
          loading={loading}
          buttonStyle={styles.buttonMargin}
        />
      </KeyboardScrollView>
    </Container>
  );
}

export default SetProfile;
