import {StyleSheet} from 'react-native';
import appColors from '../constants/appColors';
import {fontFamily} from '../constants/fontFamily';

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: appColors.text,
  },
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 56,
    flexDirection: 'row',
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D56F0',
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 100,
  },
  card: {
    borderRadius: 12,
    backgroundColor: appColors.white,
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    marginBottom: 16,
  },
  noSpaceCard: {
    alignItems: 'center',
    width: 50,
    margin: 0,
    padding: 0,
    marginVertical: 8,
    paddingHorizontal: 8,
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 0,
    marginBottom: 0,
  },
});
