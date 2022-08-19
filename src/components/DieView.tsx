import { Text, View } from 'react-native';
import styles from '../styles';
import DieFaceSelector from './DieFaceSelector';
import ModalHOC from './ModalLauncher';

export type DieFace = string | number
export type Die = DieFace[]

type DieViewProps = {
    die: Die,
    upFace: number,
    updateDie: (newDie: Die) => void
}

const DieView = ({ die, upFace, updateDie }: DieViewProps) => {
    if (die.length === 0) return null;
    const renderDieFaceSelector = (closeSelf: () => void) => <DieFaceSelector {...{closeSelf, die, updateDie}} />;
    return (
        <ModalHOC modal={renderDieFaceSelector} >
            <View style={styles.die}>
                <Text style={styles.text} adjustsFontSizeToFit numberOfLines={1}>{die[upFace]}</Text>
            </View>
        </ModalHOC>
    );
};

export default DieView;