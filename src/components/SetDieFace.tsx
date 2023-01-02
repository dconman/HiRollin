import useCallbackWithArgs from '../helpers/useCallbackWithArgs';
import styles from '../styles';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import type { FC } from 'react';

interface SetDieFaceProps {
  readonly index: number;
  readonly selected: boolean;
  readonly setUpface: (index: number) => void;
  readonly value: string;
}

const SetDieFace: FC<SetDieFaceProps> = ({
  index, selected, setUpface, value,
}: SetDieFaceProps) => {
  const setThisFace = useCallbackWithArgs(setUpface, index);
  return (
    <TouchableOpacity onPress={setThisFace}>
      <View style={styles.editDieFaceRow}>
        <Text>{selected ? '✔️' : ' '}</Text>
        <Text>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SetDieFace;
