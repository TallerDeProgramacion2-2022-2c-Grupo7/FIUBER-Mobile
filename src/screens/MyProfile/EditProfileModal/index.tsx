import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Modal from '../../../components/Modal';
import Text from '../../../components/Text';
import TextInput from '../../../components/TextInput';
import { AppDispatch, ReduxState } from '../../../interfaces/redux';
import { update } from '../../../redux/slices/profile';
import styles from './styles';

interface Props {
  modalRef: React.RefObject<Modalize>;
  dataKey: string;
  description: string;
  placeholder: string;
}

const EditProfileModal = ({
  modalRef,
  description,
  placeholder,
  dataKey,
}: Props) => {
  const [data, setData] = useState('');
  const [isError, setIsError] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { uid } = useSelector(
    (state: ReduxState) => state.auth.user || { uid: '' }
  );

  const onSaveEdit = () => {
    dispatch(update({ uid, profile: { [dataKey]: data } })).then(() => {
      modalRef.current?.close();
    });
  };

  const onCancelEdit = () => {
    console.log('Cancel');
    modalRef.current?.close();
  };

  return (
    <Portal>
      <Modal
        modalRef={modalRef}
        adjustToContentHeight
        onBackButtonPress={() => {
          return true;
        }}>
        <Header
          center={
            <Text style={styles.textHeader} type="subtitle1">
              {t(description)}
            </Text>
          }
        />
        <View style={styles.modalContainer}>
          <TextInput
            value={data}
            onChangeText={setData}
            keyboardType="default"
            onSubmitEditing={event => {
              if (event.nativeEvent.text.length < 1) {
                //dataFront.length < 1
                setIsError(true);
                return;
              }

              setIsError(false);
            }}
            returnKeyType="done"
            contentContainerStyle={styles.textInput}
            placeholder={t(placeholder || '')}
            inputStyle={styles.text}
          />
        </View>
        <View style={styles.styleError}>
          {isError === true ? (
            <Text style={styles.errorText}>{t('validations.dataNoEmpty')}</Text>
          ) : null}
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
            text="Save"
            onPress={onSaveEdit}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default EditProfileModal;
