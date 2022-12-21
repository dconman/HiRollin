import { TouchableHighlight, Text } from "react-native";
import styles, { colors } from "../styles";

export type MenuEntryType = {
    text: string, func(): void
}

const MenuEntry = ({ item: { text, func } }: { item: MenuEntryType }) => (
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
