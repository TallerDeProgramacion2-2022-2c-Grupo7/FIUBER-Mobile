import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '../../constants/fonts';
import { Colors } from '../../constants/theme';
import { fontMaker } from '../../utils/fonts';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 30,
    width: '100%',
    flex: 1,
  },

  wrapper: {
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
});
