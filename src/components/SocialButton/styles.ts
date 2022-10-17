import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/theme';

export default StyleSheet.create({
  button: {
    borderRadius: 15,
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Gray.Primary,
  },
  icon: {
    fontWeight: 'bold',
  },
});
