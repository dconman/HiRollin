import { TextInput, Button } from 'react-native';
import { useState } from 'react';
import styles from '../styles';
import { Die } from './DieView';

type DieFaceSelectorProps = {
    die: Die,
    updateDie: (die: Die) => void,
    closeSelf: () => void
}

const DieFaceSelector = ({ die, updateDie, closeSelf }: DieFaceSelectorProps) => {
    const [updatedDie, setUpdatedDie] = useState(die);
    const updateFaceCurried = (index: number) => (newFace: string) => {
        const newDie = [...updatedDie];
        newDie[index] = newFace.match(/^(\+|-)?\d*\.?\d+$/) ? +newFace : newFace;
        setUpdatedDie(newDie);
    };
    const submit = () => {
        updateDie(updatedDie);
        closeSelf();
    };
    return (<>
        {updatedDie.map((value, index) =>
            <TextInput maxLength={6} key={index} style={styles.input} value={value.toString()} onChangeText={updateFaceCurried(index)} />)
        }
        <Button onPress={closeSelf} title='Cancel' />
        <Button onPress={submit} title='Submit' />
    </>
    );
};

export default DieFaceSelector;
