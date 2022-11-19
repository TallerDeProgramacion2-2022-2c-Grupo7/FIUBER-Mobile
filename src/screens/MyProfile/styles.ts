import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '../../constants/fonts';
import { Colors } from '../../constants/theme';
import { fontMaker } from '../../utils/fonts';

export default StyleSheet.create({
    container: {
      backgroundColor: Colors.Black.Primary,
      padding: 30,
      width: '100%',
      flex: 1,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      ...fontMaker({
        size: 25,
        weight: SEMIBOLD,
        color: Colors.White.Pure,
      }),
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
    },
    textLogOut: {
      ...fontMaker({ size: 22, color: Colors.White.Primary }),
      fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
      fontWeight: 'bold',
      textDecorationLine: 'underline'
    },
});