import DieView from './DieView';
import EditDieModal from './EditDieModal';
import seedDice from '../assets/seedDice';
import useKeyedList from '../helpers/useKeyedList';
import usePopover from '../helpers/usePopover';
import styles from '../styles';
import { useCallback } from 'react';
import { View, Button, StatusBar } from 'react-native';

import type { Die, DieDefinition } from '../types';
import type { FC } from 'react';

const rollDie = (die: Die): Die => ({ ...die, upface: Math.floor(Math.random() * die.faces.length) });
const deserialize = (die: DieDefinition): Die => ({ ...die, upface: 0 });

const DiceField: FC = () => {
  const [dice, updateDie, addDie, deleteDie] = useKeyedList(seedDice.map(deserialize));
  const edit = usePopover();

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
            key={die.key}
            updateDie={updateDie}
            deleteDie={deleteDie}
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
