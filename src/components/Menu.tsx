import MenuEntry from './MenuEntry';
import styles from '../styles';
import { FlatList, View } from 'react-native';

import type { MenuEntryType } from './MenuEntry';
import type { FC } from 'react';

interface MenuProps {
  readonly data: readonly MenuEntryType[];
}

const Menu: FC<MenuProps> = ({ data }) => (
  <View>
    <FlatList contentContainerStyle={styles.menu} data={data} renderItem={MenuEntry} />
  </View>
);

export default Menu;
