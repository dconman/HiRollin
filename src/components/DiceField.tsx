import { View, Button, StatusBar } from 'react-native';
import { useState } from 'react';
import styles from '../styles';
import Die, { Die as DieType } from './Die';

const startingDice : DieType[] = [
    [1,2,3,4,5,6],
    [1,2,3,4,5,6,7,8],
    ['A', 'B', 'C', 'D']
];


const DiceField = () => {
    const [dice, updateDice] = useState(startingDice);
    const [values, setValues] = useState(() => Array(dice.length).fill(0));
    const updateDieCurried = (index: number) => (newDie: DieType) => {
        const newDice = [...dice];
        newDice[index] = newDie;
        updateDice(newDice);
    };

    const roll = (dice: DieType[]) => dice.map((die) => Math.floor(Math.random() * die.length));

    return (<>
        <View style={styles.diceField}>
            {dice.map((die, index) => <Die key={index} upFace={values[index]} die={die} updateDie={updateDieCurried(index)} />)}
            <StatusBar />
        </View>
        <View style={styles.bottomContainer}>
            <Button onPress={() => setValues(roll(dice))} title='Roll' />
        </View>
    </>);
};

export default DiceField;