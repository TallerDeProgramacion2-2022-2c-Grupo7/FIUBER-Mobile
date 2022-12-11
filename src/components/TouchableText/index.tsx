import Clipboard from '@react-native-community/clipboard';
import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import animationScales from '../../utils/animationScales';
import Icon from '../Icon';
import Text from '../Text';
import Touchable from '../Touchable';
import styles from './styles';

interface Props {
  onPress?: () => void;
  onLongPress?: () => void;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  disableAnimation?: boolean;
  loading?: boolean;
  cutText?: boolean | [number, number];
  copyable?: boolean;
}

const TouchableText = ({
  onPress,
  onLongPress,
  text,
  textStyle,
  buttonStyle,
  iconStyle,
  disabled = false,
  disableAnimation = false,
  loading = false,
  cutText = false,
  copyable = true,
  ...props
}: Props) => {
  const copyToClipboard = () => {
    if (!copyable) return;
    Clipboard.setString(text);
  };

  const cut = (address: string) => {
    if (Array.isArray(cutText)) {
      const [start, end] = cutText;
      return `${address.slice(0, start)}...${address.slice(-end)}`;
    }
    return `${address.slice(0, 10)}...${address.slice(-10)}`;
  };

  return (
    <Touchable
      scale={animationScales.medium}
      disabled={disabled || disableAnimation}
      onPress={onPress || copyToClipboard}
      onLongPress={onLongPress || onPress}>
      <View style={[styles.button, buttonStyle]} {...props}>
        <Text style={[styles.text, textStyle]}>
          {cutText ? cut(text) : text}
        </Text>
        {copyable && <FontAwesome5Icon name="copy" style={styles.icon} />}
      </View>
    </Touchable>
  );
};

export default TouchableText;
