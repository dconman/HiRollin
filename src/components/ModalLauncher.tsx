/* eslint-disable react/jsx-props-no-spreading */ //ignoring in HOC
import { View, Modal, TouchableOpacity } from "react-native";
import { useState, ComponentType, useCallback } from "react";
import styles from "../styles";
import useToggle from "../helpers/useToggle";

type Location = {
    x: number,
    y: number
};

export type ModalLauncherProps = {
    openModel(touchLocation?: Location): void
}

export type ModalProps = {
    closeModal(): void,
    pressLocation: Location
}

type ModalWrapperProps<LP, MP> = {
    LauncherComponent: ComponentType<LP & ModalLauncherProps>, launcherProps: LP, ModalComponent: ComponentType<MP & ModalProps>, modalProps: MP, closeOnTouchOutside?: boolean
}

const ModalWrapper = <LP, MP>({ LauncherComponent, launcherProps, ModalComponent, modalProps, closeOnTouchOutside = false }: ModalWrapperProps<LP, MP>) => {
    const [modalVisible, showModal, hideModal] = useToggle(false);
    const [pressLocation, setPressLocation] = useState({ x: 0, y: 0 });
    const openModal = useCallback((touchLocation = pressLocation) => {
        showModal();
        setPressLocation(touchLocation);
    }, [showModal, setPressLocation]);
    const shouldSetResponder = useCallback(() => closeOnTouchOutside, [closeOnTouchOutside]);

    return (
        <>
            <Modal
                animationType="slide"
                onRequestClose={hideModal}
                transparent
                visible={modalVisible}
            >
                <View
                    onResponderRelease={hideModal}
                    onStartShouldSetResponder={shouldSetResponder}
                    style={styles.centeredView}
                >
                    <TouchableOpacity activeOpacity={1}>
                        <ModalComponent
                            closeModal={hideModal}
                            pressLocation={pressLocation}
                            {...modalProps}
                        />
                    </TouchableOpacity>
                </View>
            </Modal>

            <LauncherComponent
                openModel={openModal}
                {...launcherProps}
            />
        </>
    );
};

export default ModalWrapper;
