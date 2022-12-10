import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/theme';
import { fontMaker } from '../../utils/fonts';

export default StyleSheet.create({
  button: {
    borderRadius: 15,
    width: '100%',
    height: 56,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: Colors.Gray.Primary,
    borderWidth: 4,
    flexDirection: 'row',
  },
  disabled: {
    opacity: 0.2,
  },
  text: {
    ...fontMaker({ weight: 'Bold', color: Colors.White.Primary, size: 24 }),
  },
  icon: {
    margin: 10,
    fontSize: 24,
    color: Colors.White.Primary,
  },
});
