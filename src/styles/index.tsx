import { StyleSheet, PixelRatio } from 'react-native';

const fontSize = 24 * PixelRatio.getFontScale();
function size(inSize: number): number {
  return PixelRatio.get() * inSize;
}

export const colors = {
  background: 'white',
  textColor: 'black',
  shadow: 'black',
  dieColor: 'blue',
  underlay: 'grey',
};

export default StyleSheet.create({
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonsRow: {
    flexDirection: 'row',
  },
  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  container: {
  },
  diceField: {
    alignItems: 'flex-start',
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: 'row',
  },
  die: {
    alignItems: 'center',
    backgroundColor: colors.dieColor,
    borderRadius: size(5),
    fontSize: fontSize * 2,
    height: size(50),
    justifyContent: 'center',
    margin: size(3),
    width: size(50),
  },
  dieText: {
    color: colors.background,
    fontSize: fontSize * 2,
  },
  editDieFaceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    borderWidth: 1,
    flex: 2,
    height: 40,
    margin: 12,
    padding: 10,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 20,
    elevation: 5,
    height: 'auto',
    margin: 20,
    padding: 25,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  popoverMenuItem: {
    padding: size(5),
  },
  scroll: {
    flexGrow: 0,
  },
  text: {
    color: colors.textColor,
    fontSize,
  },
});
