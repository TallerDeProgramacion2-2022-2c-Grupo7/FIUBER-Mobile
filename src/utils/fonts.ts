import { TextStyle } from 'react-native';

import { Inter, NORMAL_STYLE, REGULAR, weights } from '../constants/fonts';
import { isAndroid } from '../constants/platform';

interface FontMakerOptions {
  size?: number;
  color?: string;
  weight?: string;
  family?: string;
}

export const fontMaker = (options: FontMakerOptions): TextStyle => {
  const { weight = REGULAR, family = Inter, size = 16, color } = options;
  let splitFamily = '';
  let font = {};
  if (isAndroid) {
    splitFamily = family.split('-')[0];
    font = { fontFamily: `${splitFamily}-${weight}` };
  } else {
    const fontWeight = weights[weight];
    font = { fontFamily: family, fontWeight, fontStyle: NORMAL_STYLE };
  }
  return { ...font, color, fontSize: size };
};
