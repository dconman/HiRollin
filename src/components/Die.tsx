import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import DieFaceSelector, { DieFaceSelectorProps } from './DieFaceSelector';
import ModalLauncher, { ModalLauncherProps } from './ModalLauncher';

export type DieFace = string | number
export type Die = DieFace[]

type DieViewProps = {
    die: Die,
    upFace: number,
}

type DieProps = DieViewProps & DieFaceSelectorProps

const DieView = ({ die, upFace, openModel }: DieViewProps & ModalLauncherProps) => {
    return (
        <TouchableOpacity style={styles.die} onPress={() => openModel()}>
            <Text style={styles.text} adjustsFontSizeToFit numberOfLines={1}>{die[upFace]}</Text>
        </TouchableOpacity>
    );
};

const Die = ({ die, upFace, updateDie }: DieProps) => (<ModalLauncher
    ModalComponent={DieFaceSelector}
    modalProps={{die, updateDie} }
    LauncherComponent={DieView}
    launcherProps={ {die, upFace} }
    closeOnTouchOutside />
);

export default Die;