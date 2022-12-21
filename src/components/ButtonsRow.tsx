import styles from '../styles';
import { Button, View } from 'react-native';

import type { FC } from 'react';

interface ButtonsRowProps {
  readonly submitAction: () => void;
  readonly cancelAction: () => void;
}

const ButtonsRow: FC<ButtonsRowProps> = ({ submitAction, cancelAction }) => (
  <View style={styles.buttonsRow}>
    <Button onPress={cancelAction} title="Cancel" />
    <Button onPress={submitAction} title="Submit" />
  </View>
);

export default ButtonsRow;
