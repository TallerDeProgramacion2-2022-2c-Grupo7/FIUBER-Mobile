import { RouteProp, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
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
  ROUTES.SET_DRIVER_PROFILE_SCREEN
>;

const isValidProfile = (profile?: Profile) => {
  if (!profile) {
    return false;
  }
  return (
    profile.isDriver &&
    profile.car &&
    profile.car.plate &&
    profile.car.model &&
    profile.car.color &&
    profile.car.brand
  );
};

function SetDriverProfile({ navigation }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { params } =
    useRoute<RouteProp<RootStackParamList, ROUTES.SET_DRIVER_PROFILE_SCREEN>>();
  const { logedIn, user } = useSelector((state: ReduxState) => state.auth);
  const { profile } = useSelector((state: ReduxState) => state.profile);

  const { commonProfile } = params;

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!logedIn) {
      navigation.navigate(ROUTES.WELCOME);
    }
  }, [logedIn]);

  useEffect(() => {
    if (logedIn && profile) {
      navigation.navigate(ROUTES.TAB_SCREEN);
    }
  }, [logedIn, profile]);

  const generateProfile = (): Profile | undefined => {
    if (user && user.email) {
      return {
        firstName: commonProfile.firstName,
        lastName: commonProfile.lastName,
        email: user.email,
        isDriver: true,
        verifiedPhone: true,
        car: {
          brand,
          model,
          color,
          plate,
        },
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
      await dispatch(
        update({
          uid: user.uid,
          profile: generatedProfile,
        })
      );
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
            value={brand}
            onChangeText={setBrand}
            contentContainerStyle={styles.textInput}
            placeholder={t('common.brand')}
            inputStyle={styles.text}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            value={model}
            onChangeText={setModel}
            contentContainerStyle={styles.textInput}
            placeholder={t('common.model')}
            inputStyle={styles.text}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            value={color}
            onChangeText={setColor}
            contentContainerStyle={styles.textInput}
            placeholder={t('common.color')}
            inputStyle={styles.text}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            value={plate}
            onChangeText={setPlate}
            contentContainerStyle={styles.textInput}
            placeholder={t('common.plate')}
            inputStyle={styles.text}
          />
        </View>

        <Button
          disabled={!isValidProfile(generateProfile())}
          text={t('login.submit')}
          onPress={handleSubmit}
          loading={loading}
          buttonStyle={styles.buttonMargin}
        />
      </KeyboardScrollView>
    </Container>
  );
}

export default SetDriverProfile;
