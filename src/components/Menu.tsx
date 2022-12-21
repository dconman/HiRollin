import { FlatList, View } from 'react-native';
import type { MenuEntryType } from './MenuEntry';
import MenuEntry from './MenuEntry';

interface MenuProps {
  readonly data: readonly MenuEntryType[];
}

const Menu = ({ data }: MenuProps): JSX.Element => (
  <View>
    <FlatList data={data} renderItem={MenuEntry} />
  </View>
);

export default Menu;
