import { Button, GestureResponderEvent, View } from "react-native";
import styles from "../styles";

type ButtonsProps = {
    submitAction: (event: GestureResponderEvent) => void,
    cancelAction: (event: GestureResponderEvent) => void
}

const Buttons = ({submitAction, cancelAction}: ButtonsProps) =>(
    <View style={styles.buttons}>
        <Button onPress={cancelAction} title='Cancel' />
        <Button onPress={submitAction} title='Submit' />
    </View>
);

export default Buttons;
