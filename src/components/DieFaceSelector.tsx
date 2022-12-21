import { TextInput, ScrollView } from "react-native";
import { useCallback, useState } from "react";
import styles from "../styles";
import { Die } from "./Die";
import Buttons from "./Buttons";
import { numberify } from "../helpers/TypeUtils";

export type DieFaceSelectorProps = {
    die: Die,
    updateDie: (die: Die) => void,
    close: () => void
}

const DieFaceSelector = ({ die, updateDie, close }: DieFaceSelectorProps ) => {
    const [updatedDie, setUpdatedDie] = useState(die);
    const updateFaceCurried = (index: number) => useCallback((newFace: string) => {
        const newFaces = [...updatedDie.faces];
        newFaces[index].value = numberify(newFace) ?? newFace;
        setUpdatedDie((updatedDie) => ({...updatedDie, faces: newFaces}));
    }, [setUpdatedDie, updatedDie]);
    const submit = useCallback(() => {
        updateDie(updatedDie);
        close();
    }, [updateDie, updatedDie, close]);
    return  (
        <ScrollView style={styles.scroll}>
            {updatedDie.faces.map((face, index) => (
                <TextInput
                    key={face.key}
                    maxLength={6}
                    onChangeText={updateFaceCurried(index)}
                    style={styles.input}
                    value={face.value.toString()}
                />
            ))}

            <Buttons
                cancelAction={close}
                submitAction={submit}
            />
        </ScrollView>
    );
};

export default DieFaceSelector;
