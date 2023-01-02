import DieView from './DieView';
import EditDieModal from './EditDieModal';
import seedDice from '../assets/seedDice';
import useKeyedList from '../helpers/useKeyedList';
import usePopover from '../helpers/usePopover';
import { uuid2string } from '../helpers/uuid';
import styles from '../styles';
import {
  copyableAttributes, deserializeDie, rollDie, modifyDie,
} from '../types/Die';
import { useCallback } from 'react';
import { View, Button, StatusBar } from 'react-native';
import type { UUID } from '../helpers/uuid';
import type { Die } from '../types/Die';

import type { FC } from 'react';

const DiceField: FC = () => {
  const [dice, updateDie, addDie, deleteDie] = useKeyedList(seedDice.map(deserializeDie));
  const edit = usePopover();

  const updateAll = useCallback((updatedDie: Die) => {
    const updates = copyableAttributes(updatedDie);
    dice.forEach((die) => {
      if (updatedDie.key !== die.key && updatedDie.key !== die.copyOf) return;
      updateDie(modifyDie(updates, die));
    });
  }, [dice, updateDie]);

  const deletedAll = useCallback((deleteKey: UUID) => {
    dice.forEach((die) => {
      if (deleteKey !== die.key && deleteKey !== die.copyOf) return;
      deleteDie(die.key);
    });
  }, [dice, deleteDie]);

  const duplicateDie = useCallback((die: Die) => {
    addDie({ ...die, copyOf: die.key });
  }, [addDie]);

  const handleRoll = useCallback(() => {
    dice.forEach((die) => {
      updateDie(rollDie(die));
    });
  }, [dice, updateDie]);

  return (
    <>
      <View style={styles.diceField}>
        {dice.map((die) => (
          <DieView
            die={die}
            deleteDie={deletedAll}
            duplicateDie={duplicateDie}
            key={uuid2string(die.key)}
            updateDie={updateDie}
            updateDieAndCopies={updateAll}
          />
        ))}

        <StatusBar />
      </View>

      <View style={styles.bottomContainer}>
        { edit.renderPopover({ children: <EditDieModal close={edit.hidePopover} saveDie={addDie} /> })}
        <Button onPress={edit.showPopover} title="Add Die" />
        <Button onPress={handleRoll} title="Roll" />
      </View>
    </>
  );
};

export default DiceField;
