import { View, Alert } from 'react-native';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Modalize } from 'react-native-modalize';

import Text from '../Text';
import TextInput from '../TextInput';
import styles from './styles';
import Header from '../Header';
import Modal from '../Modal';
import Button from '../Button';

interface Props {
    dataDescription: string;
    dataValue: string;
    leftPosition: number;
    rightPosition: number;
    modalizeDescription?: string;
    successfullDescription?: string;
    translateText?: string;
    isEditable: boolean;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
} 

const MyProfileData = ({
    dataDescription,
    dataValue,
    leftPosition,
    rightPosition,
    modalizeDescription,
    successfullDescription,
    translateText,
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

    const onCancelEdit = () => {
      setDataFront(data);
      setIsError(false);
      setCanSave(true);
      modalRef.current?.close()
    };

    const onSaveEdit = () => {
      setData(dataFront);
      Alert.alert(successfullDescription || '');
      setCanSave(true);
      modalRef.current?.close();
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
                keyboardType='default'
                onSubmitEditing={(event) => {
                  if (event.nativeEvent.text.length < 1) { //dataFront.length < 1
                      setIsError(true);
                      return;
                  }

                  setIsError(false);
                  setCanSave(false);
                }}
                returnKeyType="done"
                contentContainerStyle={styles.textInput}
                placeholder={t(translateText || '')}
                inputStyle={styles.text}
              />
            </View>
            <View style={styles.styleError}>
              {(isError === true)?
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