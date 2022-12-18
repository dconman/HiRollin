import { Die } from "./Die";
import { FlatList, View } from "react-native";
import DieMenuEntry, { DieMenuEntryType } from "./DieMenuEntry";

type DieMenuProps = {
    die: Die,
    updateDie(die: Die): void,
    close(): void,
}

    
const DieMenu = ({ die, updateDie, close }: DieMenuProps) => {
    const ENTRIES: DieMenuEntryType[] = [
        { text: "Edit", func: () => {close();} }
    ]
        ;
    

    return (
        <View>
            <FlatList
                data={ENTRIES}
                renderItem={DieMenuEntry}
            />
        </View>
    );
};

export default DieMenu;
