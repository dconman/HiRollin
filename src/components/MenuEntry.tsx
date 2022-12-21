import type { FC } from 'react';
import { TouchableHighlight, Text } from 'react-native';
import styles, { colors } from '../styles';

export interface MenuEntryType {
  readonly text: string;
  readonly func: () => void;
}

interface MenuEntryProps {
  readonly item: MenuEntryType;
}

const MenuEntry: FC<MenuEntryProps> = ({ item: { text, func } }) => (
  <TouchableHighlight
    onPress={func}
    style={styles.popoverMenuItem}
    underlayColor={colors.underlay}
  >
    <Text style={styles.text}>
      {text}
    </Text>
  </TouchableHighlight>
);

export default MenuEntry;
