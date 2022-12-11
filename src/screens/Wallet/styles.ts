import { StyleSheet } from 'react-native';

import { BOLD, MEDIUM, SEMIBOLD } from '../../constants/fonts';
import { Colors } from '../../constants/theme';
import { fontMaker } from '../../utils/fonts';

export default StyleSheet.create({
  scroll: {
    flex: 1,
    height: '100%',
  },
  container: {
    padding: 30,
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.Gray.Secondary,
    justifyContent: 'space-between',
  },
  userInfoSection: {
    flexDirection: 'column',
  },
  title: {
    ...fontMaker({
      size: 40,
      weight: SEMIBOLD,
      color: Colors.White.Pure,
    }),
  },
  subtitle: {
    ...fontMaker({
      size: 20,
      weight: MEDIUM,
      color: Colors.White.Secondary,
    }),
  },
  balance: {
    ...fontMaker({
      size: 50,
      weight: BOLD,
      color: Colors.White.Pure,
    }),
  },
});
