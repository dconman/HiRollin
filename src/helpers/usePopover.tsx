/* eslint-disable react/jsx-props-no-spreading -- Ignored in higher order components */
import { useCallback, useState } from "react";
import { NativeSyntheticEvent } from "react-native";
import Popover, { PublicPopoverProps } from "react-native-popover-view/dist/Popover";
import { functionify } from "./TypeUtils";

export default function usePopover(initial = false) {
    const [popover, setPopover] = useState(
        { visible: initial } as { visible: boolean, handleClose?: () => void, handleOpen?: () => void }
    );

    function hideFn(event: NativeSyntheticEvent<unknown>):void;
    function hideFn(callback?: () => void):void;
    function hideFn(param?: unknown) {
        setPopover({ visible: false, handleClose: functionify(param) });
    }
    const hidePopover = useCallback(hideFn, [setPopover]);

    function showFn(callback?: () => void):void;
    function showFn(event: unknown):void;
    function showFn(param?: unknown) {
        setPopover({ visible: true, handleOpen: functionify(param) });
    }
    const showPopover = useCallback(showFn, [setPopover]);

    const renderPopover = (props: PublicPopoverProps) => (
        <Popover 
            {...props}
            isVisible={popover.visible}
            onCloseComplete={popover.handleClose}
            onOpenComplete={popover.handleOpen}
        />
    );

    return { renderPopover, visible: popover.visible, showPopover, hidePopover };
}

