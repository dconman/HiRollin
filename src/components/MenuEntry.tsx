import styles, { colors } from '../styles';
import { TouchableHighlight, Text } from 'react-native';

import type { FC } from 'react';

export interface MenuEntryType {
  readonly func: () => void;
  readonly text: string;
}

interface MenuEntryProps {
  readonly item: MenuEntryType;
}

const MenuEntry: FC<MenuEntryProps> = ({ item: { text, func } }) => (
  <TouchableHighlight
    onPress={func}
    underlayColor={colors.underlay}
  >
    <Text style={styles.text}>
      {text}
    </Text>
  </TouchableHighlight>
);

export default MenuEntry;
