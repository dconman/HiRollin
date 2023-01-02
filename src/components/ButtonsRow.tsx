import styles from '../styles';
import { Button, View } from 'react-native';

import type { ComponentPropsWithoutRef, FC } from 'react';

interface ButtonsRowProps {
  readonly cancelAction: ComponentPropsWithoutRef<typeof Button>['onPress'];
  readonly submitAction: ComponentPropsWithoutRef<typeof Button>['onPress'];
}

const ButtonsRow: FC<ButtonsRowProps> = ({ submitAction, cancelAction }) => (
  <View style={styles.buttonsRow}>
    <Button disabled={!cancelAction} onPress={cancelAction} title="Cancel" />
    <Button disabled={!submitAction} onPress={submitAction} title="Submit" />
  </View>
);

export default ButtonsRow;
