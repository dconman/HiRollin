import { StyleSheet, PixelRatio, Dimensions } from 'react-native';

const fontSize = 24 * PixelRatio.getFontScale();

const MIN_DIE_SIZE = fontSize * 5;

export function dieSize(): number {
  const windowWidth = Dimensions.get('window').width;
  const numAcross = Math.floor(windowWidth / MIN_DIE_SIZE);
  const width = windowWidth / numAcross;
  return width - 6;
}

export const colors = {
  background: 'white',
  dieColor: 'blue',
  shadow: 'black',
  textColor: 'black',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 'auto',
  },
  die: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: colors.dieColor,
    borderRadius: 10,
    fontSize: fontSize * 2,
    justifyContent: 'center',
    margin: 6,
    width: dieSize(),
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
  menu: {
    width: 100,
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
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  scroll: {
    flexGrow: 0,
  },
  text: {
    color: colors.textColor,
    fontSize,
  },
});
