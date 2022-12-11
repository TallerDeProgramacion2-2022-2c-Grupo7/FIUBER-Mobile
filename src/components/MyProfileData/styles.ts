import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '../../constants/fonts';
import { Colors } from '../../constants/theme';
import { fontMaker } from '../../utils/fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.Black.Primary,
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
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 100,
    bottom: 40,
    alignContent: 'flex-start',
  },
  infoBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textLogOut: {
    ...fontMaker({ size: 23, color: Colors.White.Primary }),
    fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  textEdit: {
    ...fontMaker({ size: 18, color: Colors.ActionBlue }),
    fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
    fontWeight: 'bold',
    top: 15,
    textDecorationLine: 'underline',
  },
  textPassword: {
    ...fontMaker({ size: 18, color: Colors.Red }),
    fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
    fontWeight: 'bold',
    top: 15,
    textDecorationLine: 'underline',
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
    ...fontMaker({ size: 22, color: Colors.Red }),
    fontFamily: undefined, // Disabling custom font because of problem with Inter and secure text entry
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
});
