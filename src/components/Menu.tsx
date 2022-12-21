import { FlatList, View } from "react-native";
import MenuEntry, { MenuEntryType } from "./MenuEntry";

type MenuProps = {
    data: MenuEntryType[]
}

    
const Menu = ({ data }: MenuProps) => {

    return (
        <View>
            <FlatList data={data} renderItem={MenuEntry} />
        </View>
    );
};

export default Menu;
