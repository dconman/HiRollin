import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import Popover from "react-native-popover-view/dist/Popover";
import useToggle from "../helpers/useToggle";
import styles from "../styles";
import DieMenu from "./DieMenu";

export type DieFace = string | number
export type Die = {
    name: string,
    faces: DieFace[]
}

type DieProps = {
    die: Die,
    upFace: number,
    updateDie(die: Die): void
}

const Die = ({ die, upFace, updateDie }: DieProps) => {
    const [menuShown, showMenu, hideMenu] = useToggle(false);
    const [showEdit, setShowEdit] = useState(false);
    //define menu options here
    return (
        <>
            <Popover
                from={
                    <TouchableOpacity
                        onPress={showMenu}
                        style={styles.die}
                    >
                        <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            style={styles.dieText}
                        >
                            {die.faces[upFace]}
                        </Text>
                    </TouchableOpacity>
                }
                isVisible={menuShown}
            >
                <DieMenu
                    close={hideMenu}
                    die={die}
                    updateDie={updateDie}
                />

            </Popover>

            {/* <Popover>launch edit die</Popover> */}
        </>
    );
};

export default Die;
