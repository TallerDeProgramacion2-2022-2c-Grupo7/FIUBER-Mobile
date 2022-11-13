import { SafeAreaView, View, Alert, KeyboardTypeOptions } from 'react-native';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Modalize } from 'react-native-modalize';

import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import animationScales from '../../utils/animationScales';
import Touchable from '..//Touchable';
import Icon from '../Icon';
import Text from '../Text';
import TextInput from '../TextInput';
import styles from './styles';
import Header from '../Header';
import Modal from '../Modal';
import Button from '../Button';

interface Props {
    dataDescription: string;
    dataValue: string;
    dataSecure?: string,
    leftPosition: number;
    rightPosition: number;
    isPhone?: boolean;
    modalizeDescription?: string;
    keyBoardType?: KeyboardTypeOptions;
    successfullDescription?: string;
    translateText?: string;
    isPassword?: boolean;
    isEditable: boolean;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
} 

const MyProfileData = ({
    dataDescription,
    dataValue,
    dataSecure,
    leftPosition,
    rightPosition,
    isPhone,
    modalizeDescription,
    keyBoardType,
    successfullDescription,
    translateText,
    isPassword,
    isEditable,
    autoCapitalize,
  }: Props) => {
    const { t } = useTranslation();
    const modalRef = useRef<Modalize>(null);

    //const [data, setData] = useState(dataSecure || dataValue);
    const [data, setData] = useState(dataValue);
    const [dataFront, setDataFront] = useState(dataValue);
    const [isError, setIsError] = useState(false);
    const [canSave, setCanSave] = useState(true);
    const [showPassword, setShowPassword] = useState(isPassword === true ? false : true);
    const [dataAux, setDataAux] = useState(dataValue);
    const [hidePassword, setHidePassword] = useState('Show');

    const onCancelEdit = () => {
      setDataFront(data);
      setIsError(false);
      modalRef.current?.close()
    };

    const onSaveEdit = () => {
      setData(dataFront);
      Alert.alert(successfullDescription || '');
      setCanSave(true);
      modalRef.current?.close();
    };

    const toggleShowPassowrd = () => {
      setShowPassword(!showPassword);
    };

    const toggleShowFrontPassowrd = () => {
      setData(dataAux);
      setDataAux(data);
      setHidePassword('Hide');
    };

    return (
        <>
          <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBox}>
              <Text style={[styles.textInfo, {right: rightPosition}]}>{dataDescription}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text numberOfLines={1} 
              style={[styles.textData, {left: leftPosition}]}
              >{data}</Text>
            </View>
            {isEditable === true?
            <View style={styles.infoBox}>
              <Text onPress={() => modalRef.current?.open()}
                numberOfLines={1} style={[styles.textEdit, {left: -400}]}>Edit</Text>
            </View>
            :
            null}
            {isPassword === true?
            <View style={styles.infoBox}>
              <Text onPress={() => toggleShowFrontPassowrd()}
                numberOfLines={1}
                style={[styles.textPassword, {left: -480}]}>{hidePassword}</Text>
            </View>
            :
            null}
          </View>

          <Modal modalRef={modalRef} adjustToContentHeight>
            <Header
              center={
                <Text style={styles.textHeader} type="subtitle1">
                  {modalizeDescription}
                </Text>
              }
            />
            <View style={styles.modalContainer}>
              <TextInput
                value={dataFront}
                autoCapitalize={autoCapitalize}
                onChangeText={setDataFront}
                keyboardType={keyBoardType}
                secureTextEntry={!showPassword}
                onSubmitEditing={(event) => {
                  if (isPassword) {
                    if (event.nativeEvent.text.length < 8) {
                        setIsError(true);
                        return;
                    }
                  } else {
                    if (dataFront.length < 1) {
                        setIsError(true);
                        return;
                    }
                  }

                  setIsError(false);
                  setCanSave(false);
                }}
                returnKeyType="done"
                contentContainerStyle={styles.textInput}
                placeholder={t(translateText || '')}
                inputStyle={styles.text}
                right={
                  isPassword === true?
                  <Touchable
                    scale={animationScales.medium}
                    onPress={toggleShowPassowrd}>
                    <Icon
                      name={showPassword ? 'passwordEyeIcon' : 'passwordEyeClosedIcon'}
                    />
                  </Touchable>
                  :
                  null
                }
              />
            </View>
            <View style={styles.styleError}>
              {(isError === true && isPassword === true)?
              <Text style={styles.errorText}>{t('validations.passInccorectNoEnought')}</Text>
              :
              (isError === true && isPassword === false)?
              <Text style={styles.errorText}>{t('validations.dataNoEmpty')}</Text>
              :
              null
              }
            </View>
            <View style={styles.styleActions}>
              <Button
                buttonStyle={{
                alignSelf: 'center',
                paddingHorizontal: '10%',
                marginRight: 10,
                backgroundColor: 'red',
              }}
              text="Cancel"
              onPress={onCancelEdit}
              />
              <Button
                buttonStyle={{
                alignSelf: 'center',
                paddingHorizontal: '10%',
                marginLeft: 10,
                backgroundColor: 'green',
              }}
              disabled={canSave}
              text="Save"
              onPress={onSaveEdit}
              />
            </View>
          </Modal>
        </>
    );
  };

  export default MyProfileData;