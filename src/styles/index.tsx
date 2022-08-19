import { StyleSheet, PixelRatio } from 'react-native';

const fontSize = 48 * PixelRatio.getFontScale();
function size(size: number) {
    return PixelRatio.get() * size;
} 

const background = 'white';
const shadow = 'black';
const dieColor = 'blue';

export default StyleSheet.create({
    container: {
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    diceField: {
        flex: 1,
        backgroundColor: background,
        flexDirection: 'row'
    },
    die: {
        borderRadius: size(5),
        backgroundColor: dieColor,
        width: size(50),
        height: size(50),
        alignItems: 'center',
        justifyContent: 'center',
        margin: size(3),
    },
    text: {
        fontSize,
        color: background
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: background,
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: shadow,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});