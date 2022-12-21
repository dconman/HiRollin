import EditDie from './EditDie';
import Menu from './Menu';
import usePopover from '../helpers/usePopover';
import styles from '../styles';
import { useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import type { Die } from '../types';
import type { MenuEntryType } from './MenuEntry';
import type { FC } from 'react';

interface DieViewProps {
  readonly die: Die;
  readonly upFace: number;
  readonly updateDie: (die: Die) => void;
}

const DieView: FC<DieViewProps> = ({ die, upFace, updateDie }) => {
  const menu = usePopover();
  const edit = usePopover();
  const [hideMenuAnd, showEdit] = [menu.hidePopoverAnd, edit.showPopover];
  const ENTRIES: MenuEntryType[] = [
    { text: 'Roll', func: menu.hidePopover },
    { text: 'Set', func: menu.showPopover },
    {
      text: 'Edit',
      func: useCallback(
        () => { hideMenuAnd(showEdit); },
        [hideMenuAnd, showEdit],
      ),
    },
    { text: 'Duplicate', func: menu.hidePopover },
    { text: 'Delete', func: menu.hidePopover },
  ];

  const dieView = (
    <TouchableOpacity onPress={menu.showPopover} style={styles.die}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.dieText}>
        {die.faces[upFace]?.value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      {menu.renderPopover({ from: dieView, children: (<Menu data={ENTRIES} />), onRequestClose: menu.hidePopover })}

      {edit.renderPopover({
        children: (<EditDie close={edit.hidePopover} die={die} updateDie={updateDie} />),
      })}
    </>
  );
};

export default DieView;
