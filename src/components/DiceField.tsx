import DieView from './DieView';
import EditDieModal from './EditDieModal';
import seedDice from '../assets/seedDice';
import useKeyedList from '../helpers/useKeyedList';
import usePopover from '../helpers/usePopover';
import styles from '../styles';
import { useCallback, useState } from 'react';
import { View, Button, StatusBar } from 'react-native';

import type { Die } from '../types';
import type { FC } from 'react';

const roll = (die: Die): number => Math.floor(Math.random() * die.faces.length);

const DiceField: FC = () => {
  const [dice, updateDie, addDie, deleteDie] = useKeyedList(seedDice);
  const edit = usePopover();
  const [values, setValues] = useState(() => Array(dice.length).fill(0) as readonly number[]);
  // TODO, value needs to be moved or somehow kept in sync with dice
  const addDieAndInsertBlank = useCallback((newEntry: Die | Omit<Die, 'key'>) => {
    addDie(newEntry);
    setValues((currentList) => [...currentList, 0]);
  }, [addDie]);

  const handleRoll = useCallback(() => {
    setValues(dice.map(roll));
  }, [dice, setValues]);

  return (
    <>
      <View style={styles.diceField}>
        {dice.map((die, index) => (
          <DieView
            die={die}
            key={die.key}
            upFace={values[index]}
            updateDie={updateDie}
            deleteDie={deleteDie}
          />
        ))}

        <StatusBar />
      </View>

      <View style={styles.bottomContainer}>
        { edit.renderPopover({ children: <EditDieModal close={edit.hidePopover} updateDie={addDieAndInsertBlank} /> })}
        <Button onPress={edit.showPopover} title="Add Die" />
        <Button onPress={handleRoll} title="Roll" />
      </View>
    </>
  );
};

export default DiceField;
