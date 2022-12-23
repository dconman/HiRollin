import styles from '../styles';
import { Button, View } from 'react-native';

import type { ComponentPropsWithoutRef, FC } from 'react';

interface ButtonsRowProps {
  readonly submitAction: NonNullable<ComponentPropsWithoutRef<typeof Button>['onPress']>;
  readonly cancelAction: NonNullable<ComponentPropsWithoutRef<typeof Button>['onPress']>;
}

const ButtonsRow: FC<ButtonsRowProps> = ({ submitAction, cancelAction }) => (
  <View style={styles.buttonsRow}>
    <Button onPress={cancelAction} title="Cancel" />
    <Button onPress={submitAction} title="Submit" />
  </View>
);

export default ButtonsRow;
