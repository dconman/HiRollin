import MenuEntry from './MenuEntry';
import { FlatList, View } from 'react-native';

import type { MenuEntryType } from './MenuEntry';
import type { FC } from 'react';

interface MenuProps {
  readonly data: readonly MenuEntryType[];
}

const Menu: FC<MenuProps> = ({ data }) => (
  <View>
    <FlatList data={data} renderItem={MenuEntry} />
  </View>
);

export default Menu;
