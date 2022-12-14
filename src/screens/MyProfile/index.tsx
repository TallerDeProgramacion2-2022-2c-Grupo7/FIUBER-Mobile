import auth from '@react-native-firebase/auth';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';

import ChangePassword from '../../components/ChangePassword';
import MyProfileData from '../../components/MyProfileData';
import Text from '../../components/Text';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { AppDispatch, ReduxState } from '../../interfaces/redux';
import { logout } from '../../redux/slices/auth';
import { clearProfile } from '../../redux/slices/profile';
import { carProfilePropList, userProfilePropList } from './data';
import EditProfileModal from './EditProfileModal';
import styles from './styles';

type Props = BottomTabScreenProps<RootStackParamList, ROUTES.MY_PROFILE_SCREEN>;

interface ModalProps {
  description: string;
  placeholder: string;
  dataKey: string;
}

const defaultModalProps: ModalProps = {
  description: '',
  placeholder: '',
  dataKey: '',
};

function MyProfile({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<Modalize>(null);
  const [modalProps, setModalProps] = useState<ModalProps>(defaultModalProps);
  const profile = useSelector((state: ReduxState) => state.profile.profile);
  const profileData = (profile || {}) as { [key: string]: string };
  const carProfile = ((profile?.isDriver && profile?.car) || {}) as {
    [key: string]: string;
  };
  const isDriver = profile?.isDriver;

  //devuelve password si no es log in con google
  const providerId = auth().currentUser?.providerData[0].providerId;

  const handleLogOut = async () => {
    navigation.navigate(ROUTES.HOME_SCREEN);
    await dispatch(logout());
    await dispatch(clearProfile());
  };

  const handleEditProfile = (key: string) => {
    const modalPropsAux = {
      ...([...userProfilePropList, ...carProfilePropList].find(
        item => item.key === key
      )?.modal || defaultModalProps),
      dataKey: key,
    };
    setModalProps(modalPropsAux);
    modalRef.current?.open();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title} type="subtitle1">
            User Data
          </Text>
        </View>

        <ScrollView
          style={{
            width: '100%',
            flexDirection: 'column',
            alignContent: 'flex-start',
            margin: 10,
          }}>
          {userProfilePropList.map(profileProps => {
            return (
              <MyProfileData
                key={profileProps.key}
                dataKey={profileProps.key}
                dataDescription={profileProps.dataDescription}
                dataValue={profileData[profileProps.key]}
                isEditable={profileProps.isEditable}
                onEdit={handleEditProfile}
              />
            );
          })}
          {isDriver &&
            carProfilePropList.map(profileProps => {
              return (
                <MyProfileData
                  key={profileProps.key}
                  dataKey={profileProps.key}
                  dataDescription={profileProps.dataDescription}
                  dataValue={carProfile[profileProps.key]}
                  isEditable={profileProps.isEditable}
                  onEdit={handleEditProfile}
                />
              );
            })}
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                padding: 1,
                alignContent: 'center',
                justifyContent: 'center', //hasta aca
                alignSelf: 'center',
              }}
              onPress={() => handleLogOut()}>
              <Text style={styles.textLogOut}>Logout</Text>
            </TouchableOpacity>
            {providerId !== 'password' ? null : <ChangePassword />}
          </View>
        </ScrollView>
      </View>
      <EditProfileModal modalRef={modalRef} {...modalProps} />
    </SafeAreaView>
  );
}

export default MyProfile;
