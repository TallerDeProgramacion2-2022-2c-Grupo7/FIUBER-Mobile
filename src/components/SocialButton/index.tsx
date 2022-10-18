import React from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Touchable from '../Touchable';
import Text from '../Text';
import animationScales from '../../utils/animationScales';
import styles from './styles';

interface Props {
    onPress: () => void;
    onLongPress?: () => void;
    text: string;
    buttonType: string;
    iconStyle?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    color : string;
}

const SocialButton = ({
    onPress,
    onLongPress,
    text,
    buttonType,
    iconStyle,
    buttonStyle,
    color,
    ...props
  }: Props) => {
    return (
      <Touchable
        scale={animationScales.medium}
        onPress={onPress}
        onLongPress={onLongPress || onPress}>
        <View style={iconStyle}>
          <FontAwesome name={buttonType} style={styles.icon} size={22} color={color} />
        </View>
        <View style={[styles.button, buttonStyle]} {...props}>
            <Text style={{color: color}} type="button">
                {text}
            </Text>
        </View>
      </Touchable>
    );
  };
  
  export default SocialButton;