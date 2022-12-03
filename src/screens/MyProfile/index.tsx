import auth from '@react-native-firebase/auth';
import { SafeAreaView, View, ScrollView } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import Text from '../../components/Text';
import styles from './styles';
import MyProfileData from '../../components/MyProfileData';
import ChangePassword from '../../components/ChangePassword';
import { logout } from '../../redux/slices/auth';
import { Profile } from '../../interfaces/profile';
import { AppDispatch, ReduxState } from '../../interfaces/redux';
import { getMyProfile } from '../../redux/slices/profile';

type Props = BottomTabScreenProps<RootStackParamList, ROUTES.MY_PROFILE_SCREEN>;

const DriverInfo = ({
  brand,
  model,
  color,
  plate
}: {
  brand: string;
  model: string;
  color: string;
  plate: string;
}) => {

  return (
    <>
      <MyProfileData
        dataDescription='Brand'
        dataValue={brand}
        leftPosition={-380} //-110
        rightPosition={110} //-110
        modalizeDescription='Change brand'
        successfullDescription='Brand changed'
        translateText='common.brand'
        isEditable={true}
        autoCapitalize='sentences'/>

      <MyProfileData
        dataDescription='Model'
        dataValue={model}
        leftPosition={-380} //-110
        rightPosition={110} //-110
        modalizeDescription='Change model'
        successfullDescription='Model changed'
        translateText='common.model'
        isEditable={true}
        autoCapitalize='sentences'/>

      <MyProfileData
        dataDescription='Color'
        dataValue={color}
        leftPosition={-380} //-113
        rightPosition={110} //-113
        modalizeDescription='Change color'
        successfullDescription='Color changed'
        translateText='common.color'
        isEditable={true}
        autoCapitalize='sentences'/>

      <MyProfileData
        dataDescription='Plate'
        dataValue={plate}
        leftPosition={-380} //-113
        rightPosition={110} //-113
        modalizeDescription='Change plate'
        successfullDescription='Plate changed'
        translateText='common.plate'
        isEditable={true}
        autoCapitalize='sentences'/>
    </>
  );
}

function MyProfile({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: ReduxState) => state.profile);
  
  const handleLogOut = async () => {
    navigation.navigate(ROUTES.HOME_SCREEN);
    await dispatch(logout());
  };

  const {email} = profile;
  const {firstName} = profile;
  const {lastName} = profile;
  const {phoneNumber} = profile;
  const {isDriver} = profile;
  const {car} = profile;
  const {brand} = car || {"brand": ""};
  const {model} = car || {"model": ""};
  const {color} = car || {"color": ""};
  const {plate} = car || {"plate": ""};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginLeft: -30}}>
            <Text style={[styles.title, {
              marginTop: 10,
            }]} type="subtitle1">User Data</Text>
          </View>
        </View>
      </View>
      
      <ScrollView>
      <MyProfileData
        dataDescription='First name'
        dataValue={firstName}
        leftPosition={-380}
        rightPosition={97}
        modalizeDescription='Change first name'
        successfullDescription='First name changed'
        translateText='common.firstName'
        isEditable={true}
        autoCapitalize='sentences'/>

      <MyProfileData
        dataDescription='Last name'
        dataValue={lastName}
        leftPosition={-380}
        rightPosition={97}
        modalizeDescription='Change last name'
        successfullDescription='Last name changed'
        translateText='common.lastName'
        isEditable={true}
        autoCapitalize='sentences'/>

      <MyProfileData
        dataDescription='Email'
        dataValue={email}
        leftPosition={-320}
        rightPosition={115}
        isEditable={false}/>

      <MyProfileData
        dataDescription='Phone'
        dataValue={phoneNumber}
        leftPosition={-360}
        rightPosition={110}
        isEditable={false}/>

      {isDriver === true ? <DriverInfo
                              brand={brand}
                              model={model}
                              color={color}
                              plate={plate}/> : <></>}

      <View
        style={{
          width: 70,
          marginTop: 20, //70
          minWidth: '100%', //hasta aca bottom 70
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
            paddingHorizontal: '10%',
            marginRight: 8,
          }}
          onPress={() => handleLogOut()}>
          <Text style={styles.textLogOut}>Logout</Text>
        </TouchableOpacity>
        <ChangePassword/>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MyProfile;