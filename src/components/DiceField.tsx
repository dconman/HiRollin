import DieView from './DieView';
import seedDice from '../assets/seedDice';
import styles from '../styles';
import { useCallback, useState } from 'react';
import { View, Button, StatusBar } from 'react-native';

import type { Die } from '../types';
import type { FC } from 'react';

const roll = (die: Die): number => Math.floor(Math.random() * die.faces.length);

const DiceField: FC = () => {
  const [dice, setDice] = useState(seedDice);
  const [values, setValues] = useState(() => Array(dice.length).fill(0) as readonly number[]);
  const updateDieCurried = (index: number) => (newDie: Die) => {
    const newDice = [...dice];
    newDice[index] = newDie;
    setDice(newDice);
  };

  const handleRoll = useCallback(() => { setValues(dice.map(roll)); }, [dice, setValues]);

  return (
    <>
      <View style={styles.diceField}>
        {dice.map((die, index) => (
          <DieView
            die={die}
            key={die.name}
            upFace={values[index]}
            updateDie={updateDieCurried(index)}
          />
        ))}

        <StatusBar />
      </View>

      <View style={styles.bottomContainer}>
        <Button onPress={handleRoll} title="Roll" />
      </View>
    </>
  );
};

export default DiceField;
