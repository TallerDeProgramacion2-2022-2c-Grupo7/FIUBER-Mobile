import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '../../constants/fonts';
import { Colors } from '../../constants/theme';
import { fontMaker } from '../../utils/fonts';

export default StyleSheet.create({
    textHeader: {
        ...fontMaker({
          size: 24,
          weight: SEMIBOLD,
          color: Colors.White.Primary,
        }),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      modalContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
        flex: 1,
        flexDirection: 'row',
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
      styleError: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        bottom: 25,
        marginTop: 5,
      },
      errorText: {
        marginTop: 5,
        color: 'red',
      },
      styleActions: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        bottom: 70,
        marginTop: 70,
        fontWeight: 'bold',
      },
      styleButton: {
        alignItems: 'center',
        padding: 1,
        alignContent: 'center',
        justifyContent: 'center', //hasta aca
        alignSelf: 'center',
        paddingHorizontal: '10%',
        marginLeft: 5,
      }, 
      textChange: {
        ...fontMaker({ size: 22, color: Colors.White.Primary }),
        fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
        fontWeight: 'bold',
        textDecorationLine: 'underline'
      },
});