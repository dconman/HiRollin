import EditDieModal from './EditDieModal';
import Menu from './Menu';
import SetDieModal from './SetDieModal';
import useCallbackWithArgs from '../helpers/useCallbackWithArgs';
import usePopover from '../helpers/usePopover';
import styles from '../styles';
import { rollDie } from '../types/Die';
import { useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import type { UUID } from '../helpers/uuid';
import type { Die } from '../types/Die';

import type { MenuEntryType } from './MenuEntry';
import type { FC } from 'react';

interface DieViewProps {
  readonly deleteDie: (deleteKey: UUID) => void;
  readonly die: Die;
  readonly duplicateDie: (die: Die) => void;
  readonly updateDie: (die: Die) => void;
  readonly updateDieAndCopies: (die: Die) => void;
}

const DieView: FC<DieViewProps> = ({
  die, deleteDie, duplicateDie, updateDie, updateDieAndCopies,
}) => {
  const menu = usePopover();
  const edit = usePopover();
  const set = usePopover();
  const deleteThisDie = useCallbackWithArgs(deleteDie, die.key);
  const rollThisDie = useCallback(() => {
    updateDie(rollDie(die));
  }, [die, updateDie]);
  const duplicateThisDie = useCallbackWithArgs(duplicateDie, die);
  const hideMenuAndRoll = useCallbackWithArgs(menu.hidePopoverAnd, rollThisDie);
  const hideMenuAndSet = useCallbackWithArgs(menu.hidePopoverAnd, set.showPopover);
  const hideMenuAndEdit = useCallbackWithArgs(menu.hidePopoverAnd, edit.showPopover);
  const hideMenuAndDuplicate = useCallbackWithArgs(menu.hidePopoverAnd, duplicateThisDie);
  const entries: MenuEntryType[] = [
    {
      func: hideMenuAndRoll,
      text: 'Roll',
    },
    { func: hideMenuAndSet, text: 'Set' },
    { func: hideMenuAndEdit, text: 'Edit' },
    {
      // This causes an unhandled promise rejection warning sometimes. An issue with the library
      func: deleteThisDie,
      text: 'Delete',
    },
  ];

  if (!die.copyOf) entries.push({ func: hideMenuAndDuplicate, text: 'Duplicate' });

  const dieView = (
    <TouchableOpacity onPress={menu.showPopover} style={styles.die}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.dieText}>
        {die.faces[die.upface]?.value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      {menu.renderPopover({
        children: (<Menu data={entries} />),
        from: dieView,
        onRequestClose: menu.hidePopover,
      })}

      {edit.renderPopover({
        children: (<EditDieModal close={edit.hidePopover} die={die} saveDie={updateDieAndCopies} />),
      })}

      {set.renderPopover({
        children: (<SetDieModal close={set.hidePopover} die={die} saveDie={updateDie} />),
      })}
    </>
  );
};

export default DieView;
