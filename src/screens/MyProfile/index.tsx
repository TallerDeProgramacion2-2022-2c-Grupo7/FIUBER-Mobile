import { SafeAreaView, View, Alert, ScrollView } from 'react-native';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Modalize } from 'react-native-modalize';

import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import styles from './styles';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import MyProfileData from '../../components/MyProfileData';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.MY_PROFILE_SCREEN>;

const isADriver = true;

const secureTextEntry = (data: string): string => {
  let aux: string = '';
  for (let i = 0; i < data.length; i++) aux += '*';
  
  return aux;
};

function DriverInfo() {
  return (
    <>
      <MyProfileData
        dataDescription='Brand'
        dataValue='User brand'
        leftPosition={-380} //-110
        rightPosition={110} //-110
        modalizeDescription='Change brand'
        keyBoardType='default'
        successfullDescription='Brand changed'
        translateText='common.brand'
        isPassword={false}
        isEditable={true}
        autoCapitalize='sentences'/>

      <MyProfileData
        dataDescription='Model'
        dataValue='User model'
        leftPosition={-380} //-110
        rightPosition={110} //-110
        modalizeDescription='Change model'
        keyBoardType='default'
        successfullDescription='Model changed'
        translateText='common.model'
        isPassword={false}
        isEditable={true}
        autoCapitalize='sentences'/>

      <MyProfileData
        dataDescription='Color'
        dataValue='User color'
        leftPosition={-380} //-113
        rightPosition={110} //-113
        modalizeDescription='Change color'
        keyBoardType='default'
        successfullDescription='Color changed'
        translateText='common.color'
        isPassword={false}
        isEditable={true}
        autoCapitalize='sentences'/>

      <MyProfileData
        dataDescription='Plate'
        dataValue='User plate'
        leftPosition={-380} //-113
        rightPosition={110} //-113
        modalizeDescription='Change plate'
        keyBoardType='default'
        successfullDescription='Plate changed'
        translateText='common.plate'
        isPassword={false}
        isEditable={true}
        autoCapitalize='sentences'/>
    </>
  );
}

function MyProfile({ navigation }: Props) {
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
        keyBoardType='default'
        successfullDescription='First name changed'
        translateText='common.firstName'
        isPassword={false}
        isEditable={true}
        autoCapitalize='sentences'/>

      <MyProfileData
        dataDescription='Last name'
        dataValue='User last name'
        leftPosition={-380}
        rightPosition={97}
        modalizeDescription='Change last name'
        keyBoardType='default'
        successfullDescription='Last name changed'
        translateText='common.lastName'
        isPassword={false}
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
        isPhone={true}
        leftPosition={-360}
        rightPosition={110}
        isEditable={false}/>
      
      <MyProfileData
        dataDescription='Password'
        dataValue='User password'
        dataSecure={secureTextEntry('User password')}
        leftPosition={-380}
        rightPosition={96}
        modalizeDescription='Change password'
        keyBoardType='default'
        successfullDescription='Password changed'
        translateText='common.enterPassword'
        isPassword={true}
        isEditable={true}
        autoCapitalize='none'/>

      {isADriver ? <DriverInfo/> : <></>}

      <View
        style={{
          width: 70,
          marginTop: 20,
          minWidth: '100%',
      }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            padding: 1,
            alignContent: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log("logout")}>
          <Text style={styles.textLogOut}>Logout</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MyProfile;