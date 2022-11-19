import { View, Alert } from 'react-native';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Modalize } from 'react-native-modalize';

import animationScales from '../../utils/animationScales';
import Touchable from '..//Touchable';
import Icon from '../Icon';
import Text from '../Text';
import TextInput from '../TextInput';
import styles from './styles';
import Header from '../Header';
import Modal from '../Modal';
import Button from '../Button';

const ChangePassword = () => {
    const { t } = useTranslation();
    const modalRef = useRef<Modalize>(null);
    
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [canSave, setCanSave] = useState(true);
    const [disabledNewPassword, setDisabledNewPassword] = useState(true);

    const onCancelEdit = () => {
        setPassword('');
        setNewPassword('');
        setIsError(false);
        setCanSave(true);
        setShowPassword(false);
        setShowNewPassword(false);
        modalRef.current?.close()
      };
  
    const onSaveEdit = () => {
        Alert.alert('Password changed');
        setCanSave(true);
        setPassword('');
        setNewPassword('');
        setShowPassword(false);
        setShowNewPassword(false);
        modalRef.current?.close();
      };

    const toggleShowPassowrd = () => {
        setShowPassword(!showPassword);
      };

      const toggleShowNewPassowrd = () => {
        setShowNewPassword(!showNewPassword);
      };

      return (
        <>
          <View style={styles.styleButton}>
              <Text onPress={() => modalRef.current?.open()}
                numberOfLines={1} style={[styles.textChange]}>Change password</Text>
          </View>
          <Modal modalRef={modalRef} adjustToContentHeight>
            <Header
              center={
                <Text style={styles.textHeader} type="subtitle1">
                  Change password
                </Text>
              }
            />
              <View style={styles.modalContainer}>
                <TextInput
                  value={password}
                  autoCapitalize='none'
                  onChangeText={setPassword}
                  keyboardType='default'
                  returnKeyType="done"
                  secureTextEntry={!showPassword}
                  onSubmitEditing={(event) => {
                    if (event.nativeEvent.text.length < 8) {
                      setIsError(true);
                      return;
                    }
                      
                    setIsError(false);
                    setDisabledNewPassword(false);
                  }}
                  contentContainerStyle={styles.textInput}
                  placeholder={t('common.enterCurrentPassword')}
                  inputStyle={styles.text}
                  right={
                    <Touchable
                      scale={animationScales.medium}
                      onPress={toggleShowPassowrd}>
                      <Icon
                        name={showPassword ? 'passwordEyeClosedIcon' : 'passwordEyeIcon'}
                      />
                    </Touchable>
                  }
                />
              </View>

              <View style={styles.modalContainer}>
                <TextInput
                  value={newPassword}
                  autoCapitalize='none'
                  onChangeText={setNewPassword}
                  keyboardType='default'
                  returnKeyType="done"
                  disabled={disabledNewPassword}
                  secureTextEntry={!showNewPassword}
                  onSubmitEditing={(event) => {
                    if (event.nativeEvent.text.length < 8) {
                      setIsError(true);
                      return;
                    }
                      
                    setIsError(false);
                    setCanSave(false);
                  }}
                  contentContainerStyle={styles.textInput}
                  placeholder={t('common.enterNewPassword')}
                  inputStyle={styles.text}
                  right={
                    <Touchable
                      scale={animationScales.medium}
                      onPress={toggleShowNewPassowrd}>
                      <Icon
                        name={showNewPassword ? 'passwordEyeClosedIcon' : 'passwordEyeIcon'}
                      />
                    </Touchable>
                  }
                />
              </View>
            <View style={styles.styleError}>
              {(isError === true)?
              <Text style={styles.errorText}>{t('validations.passInccorectNoEnought')}</Text>
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
      )
};

export default ChangePassword;