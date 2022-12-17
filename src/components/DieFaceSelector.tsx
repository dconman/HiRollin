import { TextInput, Button, ScrollView, View } from 'react-native';
import { useState } from 'react';
import styles from '../styles';
import { Die } from './Die';
import { ModalProps } from './ModalLauncher';

export type DieFaceSelectorProps = {
    die: Die,
    updateDie: (die: Die) => void
}

const DieFaceSelector = ({ die, updateDie, closeModal }: DieFaceSelectorProps & ModalProps) => {
    const [updatedDie, setUpdatedDie] = useState(die);
    const updateFaceCurried = (index: number) => (newFace: string) => {
        const newDie = [...updatedDie];
        newDie[index] = newFace.match(/^(\+|-)?\d*\.?\d+$/) ? +newFace : newFace;
        setUpdatedDie(newDie);
    };
    const submit = () => {
        updateDie(updatedDie);
        closeModal();
    };
    return (
        <View style={styles.modalView}>
            <ScrollView style={styles.scroll}>
                {updatedDie.map((value, index) =>
                    <TextInput maxLength={6} key={index} style={styles.input} value={value.toString()} onChangeText={updateFaceCurried(index)} />)
                }
                <View style={styles.buttons}>
                    <Button onPress={closeModal} title='Cancel' />
                    <Button onPress={submit} title='Submit' />
                </View>
            </ScrollView>
        </View>
    );
};

export default DieFaceSelector;
