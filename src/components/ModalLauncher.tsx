import { View, Modal, Pressable } from 'react-native';
import { useState, ReactNode } from 'react';
import styles from '../styles';

type ModalLauncherProps = {
    modal: (closeSelf: ()=>void) => ReactNode,
    children: ReactNode
}

const ModalLauncher = ({modal, children}: ModalLauncherProps ) => {
    const [modalVisible, setModalVisible] = useState(false);
    const closeSelf = () => setModalVisible(false);
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
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {modal(closeSelf)}
                    </View>
                </View>
            </Modal>
            <Pressable onPress={() => setModalVisible(true)}>
                {children}
            </Pressable>
        </>
    );
};

export default ModalLauncher;