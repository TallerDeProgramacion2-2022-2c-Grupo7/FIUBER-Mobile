import { SafeAreaView, View, ScrollView } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import Text from '../../components/Text';
import styles from './styles';
import MyProfileData from '../../components/MyProfileData';
import ChangePassword from '../../components/ChangePassword';
import { logout } from '../../redux/slices/auth';
import { AppDispatch, ReduxState } from '../../interfaces/redux';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.MY_PROFILE_SCREEN>;

const isADriver = true;

function DriverInfo() {
  return (
    <>
      <MyProfileData
        dataDescription='Brand'
        dataValue='User brand'
        leftPosition={-380} //-110
        rightPosition={110} //-110
        modalizeDescription='Change brand'
        successfullDescription='Brand changed'
        translateText='common.brand'
        isEditable={true}
        autoCapitalize='sentences'/>

      <MyProfileData
        dataDescription='Model'
        dataValue='User model'
        leftPosition={-380} //-110
        rightPosition={110} //-110
        modalizeDescription='Change model'
        successfullDescription='Model changed'
        translateText='common.model'
        isEditable={true}
        autoCapitalize='sentences'/>

      <MyProfileData
        dataDescription='Color'
        dataValue='User color'
        leftPosition={-380} //-113
        rightPosition={110} //-113
        modalizeDescription='Change color'
        successfullDescription='Color changed'
        translateText='common.color'
        isEditable={true}
        autoCapitalize='sentences'/>

      <MyProfileData
        dataDescription='Plate'
        dataValue='User plate'
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
  
  const handleLogOut = async () => {
    await dispatch(logout());
  };

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
        dataValue='User first name'
        leftPosition={-380}
        rightPosition={97}
        modalizeDescription='Change first name'
        successfullDescription='First name changed'
        translateText='common.firstName'
        isEditable={true}
        autoCapitalize='sentences'/>

      <MyProfileData
        dataDescription='Last name'
        dataValue='User last name'
        leftPosition={-380}
        rightPosition={97}
        modalizeDescription='Change last name'
        successfullDescription='Last name changed'
        translateText='common.lastName'
        isEditable={true}
        autoCapitalize='sentences'/>

      <MyProfileData
        dataDescription='Email'
        dataValue='User email'
        leftPosition={-340}
        rightPosition={115}
        isEditable={false}/>

      <MyProfileData
        dataDescription='Phone'
        dataValue='User phone'
        leftPosition={-360}
        rightPosition={110}
        isEditable={false}/>

      {isADriver ? <DriverInfo/> : <></>}

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