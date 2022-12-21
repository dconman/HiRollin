import { View, Button, StatusBar } from "react-native";
import { useCallback, useState } from "react";
import styles from "../styles";
import Die, { Die as DieType } from "./Die";
import seedDice from "../assets/seedDice";


const roll = (die: DieType) => Math.floor(Math.random() * die.faces.length);

const DiceField = () => {
    const [dice, setDice] = useState(seedDice);
    const [values, setValues] = useState(() => Array(dice.length).fill(0));
    const updateDieCurried = (index: number) => (newDie: DieType) => {
        const newDice = [...dice];
        newDice[index] = newDie;
        setDice(newDice);
    };

    const handleRoll = useCallback(() => setValues(dice.map(roll)), [dice, setValues]);


    return (
        <>
            <View style={styles.diceField}>
                {dice.map((die, index) => (
                    <Die
                        die={die}
                        key={die.name}
                        upFace={values[index]}
                        updateDie={updateDieCurried(index)}
                    />
                ))}

                <StatusBar />
            </View>

            <View style={styles.bottomContainer}>
                <Button onPress={handleRoll} title='Roll' />
            </View>
        </>
    );
};

export default DiceField;
