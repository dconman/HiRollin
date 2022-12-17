import { StyleSheet, PixelRatio } from 'react-native';

const fontSize = 48 * PixelRatio.getFontScale();
function size(size: number) {
    return PixelRatio.get() * size;
} 

const background = 'white';
const shadow = 'black';
const dieColor = 'blue';

export default StyleSheet.create({
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    buttons: {
        flexDirection: 'row'
    },
    centeredView: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginTop: 22
    },
    container: {
    },
    diceField: {
        alignItems: 'flex-start',
        backgroundColor: background,
        flex: 1,
        flexDirection: 'row'
    },
    die: {
        alignItems: 'center',
        backgroundColor: dieColor,
        borderRadius: size(5),
        height: size(50),
        justifyContent: 'center',
        margin: size(3),
        width: size(50),
    },
    input: {
        borderWidth: 1,
        height: 40,
        margin: 12,
        padding: 10,
    },
    modalView: {
        alignItems: 'center',
        backgroundColor: background,
        borderRadius: 20,
        elevation: 5,
        height: 'auto',
        margin: 20,
        padding: 25,
        shadowColor: shadow,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },
    scroll: {
        flexGrow: 0
    },
    text: {
        color: background,
        fontSize
    }
});