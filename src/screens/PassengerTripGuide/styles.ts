import { StyleSheet } from 'react-native';

import { SEMIBOLD } from '../../constants/fonts';
import { pixelRatioScale } from '../../constants/platform';
import { Colors } from '../../constants/theme';
import { fontMaker } from '../../utils/fonts';

export default StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 30,
    width: '100%',
    flex: 1,
  },
  plugIcon: {
    height: pixelRatioScale(50),
    resizeMode: 'contain',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    ...fontMaker({
      size: 26,
      weight: SEMIBOLD,
      color: Colors.White.Primary,
    }),
    marginTop: 0,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    ...fontMaker({
      size: 26,
      color: Colors.White.Primary,
    }),
    marginTop: 27,
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

  moreOptionsButton: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  moreOptionsIcon: {
    marginLeft: 11,
  },
  valid: {
    color: Colors.ActionBlue,
    marginTop: 23,
    marginLeft: 30,
  },
});
