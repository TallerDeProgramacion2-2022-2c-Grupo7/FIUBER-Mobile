import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '../../constants/fonts';
import { Colors } from '../../constants/theme';
import { fontMaker } from '../../utils/fonts';

export default StyleSheet.create({
  textEdit: {
    ...fontMaker({ size: 18, color: Colors.ActionBlue }),
    fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  textInfo: {
    ...fontMaker({ size: 18, color: Colors.White.Primary }),
    fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
    fontWeight: 'bold',
  },
  textData: {
    ...fontMaker({ size: 16, color: Colors.White.Secondary }),
    fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
    fontWeight: 'normal',
  },
  container: {
    padding: 30,
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.Gray.Secondary,
  },
  userInfoSection: {
    flexDirection: 'column',
  },
  title: {
    ...fontMaker({
      size: 25,
      weight: SEMIBOLD,
      color: Colors.White.Pure,
    }),
  },
  textLogOut: {
    ...fontMaker({ size: 22, color: Colors.White.Primary }),
    fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
