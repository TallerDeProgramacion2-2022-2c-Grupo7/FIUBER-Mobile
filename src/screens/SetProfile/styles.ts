import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '../../constants/fonts';
import { pixelRatioScale } from '../../constants/platform';
import { Colors } from '../../constants/theme';
import { fontMaker } from '../../utils/fonts';

const commonMargin = 20;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: Colors.Black.Primary,
    padding: 30,
    width: '100%',
    flex: 1,
  },
  plugIcon: {
    height: pixelRatioScale(30),
    resizeMode: 'contain',
  },
  title: {
    ...fontMaker({
      size: 26,
      weight: SEMIBOLD,
      color: Colors.White.Primary,
    }),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: commonMargin,
  },
  textInputContainer: {
    width: '100%',
    marginBottom: commonMargin,
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
  componentMargin: {
    marginTop: commonMargin,
  },
  buttonMargin: {
    marginTop: commonMargin,
    minWidth: '100%',
  },
  errorText: {
    marginTop: 5,
    color: 'red',
  },
  moreOptionsButton: {
    flexDirection: 'row',
    opacity: 0.5,
    alignSelf: 'center',
  },
  moreOptionsIcon: {
    marginLeft: 11,
  },
  biometricsButton: {
    flexDirection: 'row-reverse',
  },
  biometricsIcon: {
    marginRight: 11,
  },
  switchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
