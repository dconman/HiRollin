import DieView from './DieView';
import EditDieModal from './EditDieModal';
import seedDice from '../assets/seedDice';
import useKeyedList from '../helpers/useKeyedList';
import usePopover from '../helpers/usePopover';
import styles from '../styles';
import { deserializeDie, rollDie } from '../types/Die';
import { useCallback } from 'react';
import { View, Button, StatusBar } from 'react-native';

import type { FC } from 'react';

const DiceField: FC = () => {
  const [dice, updateDie, addDie, deleteDie] = useKeyedList(seedDice.map(deserializeDie));
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
