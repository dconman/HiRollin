import EditDieModal from './EditDieModal';
import Menu from './Menu';
import useCallbackWithArgs from '../helpers/useCallbackWithArgs';
import usePopover from '../helpers/usePopover';
import styles from '../styles';
import { rollDie } from '../types/Die';
import { useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import type { Die } from '../types/Die';

import type { MenuEntryType } from './MenuEntry';
import type { FC } from 'react';

interface DieViewProps {
  readonly deleteDie: (deleteKey: string) => void;
  readonly die: Die;
  readonly updateDie: (die: Die) => void;
}

const DieView: FC<DieViewProps> = ({
  die, deleteDie, updateDie,
}) => {
  const menu = usePopover();
  const edit = usePopover();
  const deleteThisDie = useCallbackWithArgs(deleteDie, die.key);
  const rollThisDie = useCallback(() => {
    updateDie(rollDie(die));
  }, [die, updateDie]);
  const ENTRIES: MenuEntryType[] = [
    {
      func: useCallbackWithArgs(menu.hidePopoverAnd, rollThisDie),
      text: 'Roll',
    },
    { func: menu.showPopover, text: 'Set' },
    {
      // This causes an unhandled promise rejection warning sometimes. An issue with the library
      func: deleteThisDie,
      text: 'Edit',
    },
    { func: menu.hidePopover, text: 'Duplicate' },
    { func: useCallbackWithArgs(menu.hidePopoverAnd, deleteThisDie), text: 'Delete' },
  ];

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
        children: (<Menu data={ENTRIES} />),
        from: dieView,
        onRequestClose: menu.hidePopover,
      })}

      {edit.renderPopover({
        children: (<EditDieModal close={edit.hidePopover} die={die} saveDie={updateDie} />),
      })}
    </>
  );
};

export default DieView;
