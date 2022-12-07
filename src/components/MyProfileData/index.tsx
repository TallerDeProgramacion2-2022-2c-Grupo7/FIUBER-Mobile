import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Text from '../Text';
import styles from './styles';

interface Props {
  dataKey: string;
  dataDescription: string;
  dataValue: string;
  isEditable: boolean;
  onEdit: (key: string) => void;
}

const MyProfileData = ({
  dataKey,
  dataDescription,
  dataValue,
  isEditable,
  onEdit,
}: Props) => {
  const { t } = useTranslation();

  return (
    <View style={{ width: '100%', flexDirection: 'column', margin: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'column',
            width: '50%',
          }}>
          <Text style={styles.textInfo}>{t(dataDescription)}</Text>
        </View>
        {isEditable && (
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              width: '45%',
            }}>
            <Text style={styles.textEdit} onPress={() => onEdit(dataKey)}>
              Edit
            </Text>
          </View>
        )}
      </View>

      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Text style={styles.textData}>{dataValue}</Text>
      </View>
    </View>
  );
};

export default MyProfileData;
