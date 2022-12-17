import { View, Modal, TouchableOpacity } from 'react-native';
import { useState, ComponentType } from 'react';
import styles from '../styles';

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

function ModalWrapper<LP, MP>({ LauncherComponent, launcherProps, ModalComponent, modalProps, closeOnTouchOutside = false }: ModalWrapperProps<LP, MP>) {
    const [modalVisible, setModalVisible] = useState(false);
    const [pressLocation, setPressLocation] = useState({ x: 0, y: 0 });
    const openModal = (touchLocation = pressLocation) => {
        setModalVisible(true);
        setPressLocation(touchLocation);
    };
    const closeModal = () => setModalVisible(false);

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView} onStartShouldSetResponder={() => closeOnTouchOutside} onResponderRelease={closeModal}>
                    <TouchableOpacity activeOpacity={1}>
                        <ModalComponent closeModal={closeModal} pressLocation={pressLocation} {...modalProps} />
                    </TouchableOpacity>
                </View>
            </Modal>
            <LauncherComponent openModel={openModal} {...launcherProps} />
        </>
    );
}

export default ModalWrapper;