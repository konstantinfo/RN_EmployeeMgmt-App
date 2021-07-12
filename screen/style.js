import { StyleSheet, Dimensions } from 'react-native';
import { vw, vh } from '../../common/ViewportUnits';
import Colors from '../../common/Colors';
import Fonts from '../../common/Fonts';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.whiteFour,
  },
  headingTextStyle: {
    fontFamily: Fonts.bold,
    fontSize: vw(24),
    color: Colors.black,
    marginBottom: vh(16),
  },
  itemStyle: {
    width: '33%',
    // padding: vw(4)
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: 'center',
    marginBottom: vh(8),
  },
  itemInnerStyle: {
    width: Dimensions.get('window').width / 3 - (vw(12) + vw(8)),
    height: Dimensions.get('window').width / 3 - (vh(12) + vh(8)),
    borderRadius: vw(6),
    backgroundColor: Colors.whiteFour,
    borderWidth: 1,
    borderColor: 'rgba(137, 137, 140, 0.26)',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: vh(12),
    paddingHorizontal: vw(10),
  },
  itemIconStyle: {
    width: vw(32),
    height: vw(32),
    marginBottom: vh(12),
  },
  itemTextStyle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    textAlign: 'center',
    color: Colors.black,
  },
  headerCustom1Style: {
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 1,
    elevation: 1,
  },
  headerTitleStyle: {
    alignSelf: 'center',
  },
});

// make this component available to the app
export default styles;
