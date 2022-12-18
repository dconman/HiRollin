import { TouchableHighlight, Text } from "react-native";
import styles, { colors } from "../styles";

export type DieMenuEntryType = {
    text: string, func(): void
}

const DieMenuEntry = ({ item: { text, func } }: { item: DieMenuEntryType }) => (
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

export default DieMenuEntry;
