import { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../styles";
import DieFaceSelector from "./DieFaceSelector";
import Menu from "./Menu";
import { MenuEntryType } from "./MenuEntry";
import usePopover from "../helpers/usePopover";

export type DieFace = {value: string | number, key: string}
export type Die = {
    name: string,
    key: string,
    faces: DieFace[]
}

type DieProps = {
    die: Die,
    upFace: number,
    updateDie(die: Die): void
}

const Die = ({ die, upFace, updateDie }: DieProps) => {
    const menu = usePopover();
    const edit = usePopover();
    const ENTRIES: MenuEntryType[] = [
        { text: "Roll", func: menu.hidePopover },
        { text: "Set", func: menu.showPopover },
        { text: "Edit", func: useCallback(
            () =>  menu.hidePopover(edit.showPopover),
            [menu.hidePopover, edit.showPopover])
        },
        { text: "Duplicate", func: menu.hidePopover },
        { text: "Delete", func: menu.hidePopover },
    ];

    const dieView = (
        <TouchableOpacity onPress={menu.showPopover} style={styles.die}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.dieText} >
                {die.faces[upFace]?.value}
            </Text>
        </TouchableOpacity>
    );

    return (
        <>
            {menu.renderPopover({from: dieView, children: (<Menu data={ENTRIES} />), onRequestClose: menu.hidePopover})}

            {edit.renderPopover({
                children: (<DieFaceSelector close={edit.hidePopover} die={die} updateDie={updateDie} />)
            })}
        </>
    );
};

export default Die;
