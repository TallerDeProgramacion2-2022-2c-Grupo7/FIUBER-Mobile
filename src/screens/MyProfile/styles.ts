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
    textInfo: {
      ...fontMaker({ size: 18, color: Colors.White.Primary }),
      fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
      fontWeight: 'bold',
      margin: 20,
      top: 15,
      right: 110,
    },
    textData: {
      ...fontMaker({ size: 16, color: Colors.White.Secondary }),
      fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
      fontWeight: 'normal',
      margin: 20,
      top: 40,
      left: -400,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      flexDirection: 'row',
      height: 100,
      bottom: 40,
      marginTop: -10 //toco esto para achicar el espacio
    },
    infoBox: {
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textLogOut: {
      ...fontMaker({ size: 23, color: Colors.White.Primary }),
      fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
      fontWeight: 'bold',
      textDecorationLine: 'underline'
    },
    textEdit: {
      ...fontMaker({ size: 18, color: Colors.ActionBlue }),
      fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
      fontWeight: 'bold',
      top: 15,
      textDecorationLine: 'underline'
    },
    textInput: {
      backgroundColor: Colors.Gray.Secondary,
    },
    text: {
      ...fontMaker({ size: 18, color: Colors.White.Pure }),
      fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
      fontWeight: 'bold',
      margin: 10,
    },
    modalContainer: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
      flex: 1,
      flexDirection: 'row',
    },
    textCancel: {
      ...fontMaker({ size: 20, color: Colors.Red }),
      fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
      fontWeight: 'bold',
      textDecorationLine: 'underline'
    },
    styleCancel: {
      flexDirection: 'row',
      alignSelf: 'center',
      alignContent: 'center',
      alignItems: 'center',
      bottom: 70,
      marginTop: 70,
    },
    textHeader: {
      ...fontMaker({
        size: 22,
        weight: SEMIBOLD,
        color: Colors.White.Primary,
      }),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
});