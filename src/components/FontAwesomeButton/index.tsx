import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import FontAwesome5Icon, {
  FontAwesome5IconProps,
} from 'react-native-vector-icons/FontAwesome5';

import animationScales from '../../utils/animationScales';
import Icon from '../Icon';
import Text from '../Text';
import Touchable from '../Touchable';
import styles from './styles';

interface Props {
  onPress: () => void;
  onLongPress?: () => void;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconName: string;
  disabled?: boolean;
  disableAnimation?: boolean;
  loading?: boolean;
  iconProps?: Omit<FontAwesome5IconProps, 'name'>;
}

const FontAwesomeButton = ({
  onPress,
  onLongPress,
  text,
  textStyle,
  iconName,
  buttonStyle,
  iconStyle,
  disabled = false,
  disableAnimation = false,
  loading = false,
  iconProps,
  ...props
}: Props) => {
  return (
    <Touchable
      scale={animationScales.medium}
      disabled={disabled || disableAnimation}
      onPress={onPress}
      onLongPress={onLongPress || onPress}>
      <View style={[styles.button, buttonStyle]} {...props}>
        {loading ? (
          <ActivityIndicator style={StyleSheet.absoluteFill} color="white" />
        ) : (
          <FontAwesome5Icon name={iconName} {...iconProps} />
        )}
      </View>
      <Text style={[textStyle]}>{text}</Text>
    </Touchable>
  );
};

export default FontAwesomeButton;
