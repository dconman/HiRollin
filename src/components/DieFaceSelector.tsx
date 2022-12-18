import { TextInput, ScrollView, View } from "react-native";
import { useCallback, useState } from "react";
import styles from "../styles";
import { Die } from "./Die";
import { ModalProps } from "./ModalLauncher";
import Buttons from "./Buttons";

export type DieFaceSelectorProps = {
    die: Die,
    updateDie: (die: Die) => void
}

const DieFaceSelector = ({ die, updateDie, closeModal }: DieFaceSelectorProps & ModalProps) => {
    const [updatedDie, setUpdatedDie] = useState(die);
    const updateFaceCurried = (index: number) => (newFace: string) => {
        const newFaces = [...updatedDie.faces];
        newFaces[index] = newFace.match(/^(\+|-)?\d*\.?\d+$/) ? +newFace : newFace;
        setUpdatedDie({...updatedDie, faces: newFaces});
    };
    const submit = useCallback(() => {
        updateDie(updatedDie);
        closeModal();
    }, [updateDie, updatedDie, closeModal]);
    return (
        <View style={styles.modalView}>
            <ScrollView style={styles.scroll}>
                {updatedDie.faces.map((value, index) => (
                    <TextInput
                        // We own updating these
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        maxLength={6}
                        onChangeText={updateFaceCurried(index)}
                        style={styles.input}
                        value={value.toString()}
                    />
                ))}

                <Buttons
                    cancelAction={closeModal}
                    submitAction={submit}
                />
            </ScrollView>
        </View>
    );
};

export default DieFaceSelector;
