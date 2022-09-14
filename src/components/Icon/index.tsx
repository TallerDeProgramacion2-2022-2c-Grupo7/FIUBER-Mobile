import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import PasswordEyeClosedIcon from './svg/PasswordEyeClosedIcon';
import PasswordEyeIcon from './svg/PasswordEyeIcon';

export const IconTypes = (type: string) =>
  ({
    passwordEyeIcon: PasswordEyeIcon,
    passwordEyeClosedIcon: PasswordEyeClosedIcon,
  }[type]);

interface Props {
  name: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const Icon = ({ name, color, ...props }: Props) => {
  const IconElement = IconTypes(name) as React.FunctionComponent<any>;
  return <IconElement {...props} name={name} color={color} />;
};

export default Icon;
