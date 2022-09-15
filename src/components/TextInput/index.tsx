import React from 'react';
import {
  StyleProp,
  TextInput as Input,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import styles, { defaultPlaceholderTextColor } from './styles';

interface Props extends TextInputProps {
  ref?: React.RefObject<Input>;
  hideGradient?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  error?: boolean;
}

const TextInput = ({
  ref,
  value,
  onChangeText,
  placeholder,
  onSubmitEditing,
  inputStyle,
  disabled,
  maxLength,
  left,
  right,
  testID,
  placeholderTextColor = defaultPlaceholderTextColor,
  secureTextEntry,
  multiline,
  contentContainerStyle,
  onBlur,
  onFocus,
  blurOnSubmit,
  ...props
}: Props) => {
  const innerContainerStyle = [
    styles.innerContainer,
    multiline && styles.multilineContainer,
  ];

  const handleOnFocus = (event: any) => {
    onFocus?.(event);
  };

  const handleOnBlur = (event: any) => {
    onBlur?.(event);
  };

  return (
    <View style={[innerContainerStyle, contentContainerStyle]}>
      {left}
      <Input
        underlineColorAndroid="transparent"
        style={[styles.textInput, inputStyle]}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
        maxLength={maxLength}
        value={value}
        editable={!disabled}
        ref={ref}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        keyboardAppearance="dark"
        testID={testID}
        multiline={multiline}
        {...props}
      />
      {right}
    </View>
  );
};

export default TextInput;
