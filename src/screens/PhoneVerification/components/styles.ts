import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '../../../constants/fonts';
import { Colors } from '../../../constants/theme';
import { fontMaker } from '../../../utils/fonts';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 30,
    width: '100%',
    flex: 1,
  },

  phoneInputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  componentMargin: {
    marginTop: 27,
  },
  buttonMargin: {
    marginTop: 22,
  },
  buttonStyling: {
    minWidth: '84%',
  },
  secondButtonStyling: {
    minWidth: '84%',
    backgroundColor: Colors.Transparent,
    borderColor: Colors.White.Secondary,
    borderWidth: 2,
  },
  textStyling: {
    ...fontMaker({
      size: 18,
      color: Colors.White.Pure,
      weight: SEMIBOLD,
    }),
  },
  textContainerStyle: {
    backgroundColor: Colors.Gray.Secondary,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 16,
  },
  containerStyle: {
    backgroundColor: Colors.Gray.Secondary,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 16,
  },

  codeInputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: Colors.White.Secondary,
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  prompt: {
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
  },

  error: {
    color: 'red',
  },
});
