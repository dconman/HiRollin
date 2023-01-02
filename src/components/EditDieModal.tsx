import ButtonsRow from './ButtonsRow';
import EditDieFace from './EditDieFace';
import useCallbackWithArgs from '../helpers/useCallbackWithArgs';
import useKeyedList from '../helpers/useKeyedList';
import { uuid2string } from '../helpers/uuid';
import styles from '../styles';
import { useCallback, useEffect } from 'react';
import { Button, ScrollView } from 'react-native';

import type { Die } from '../types/Die';
import type { FC } from 'react';

interface EditDieProps {
  readonly close: () => void;
  readonly die: Die;
  readonly saveDie: (die: EditDieProps['die']) => void;
}

interface NewDieProps {
  readonly close: () => void;
  readonly die?: Omit<Die, 'key' >;
  readonly saveDie: (die: Die | Omit<Die, 'key'>) => void;
}

const EditDieModal: FC<EditDieProps | NewDieProps> = ({
  die = { faces: [], name: '', upface: 0 }, saveDie, close,
}: EditDieProps | NewDieProps) => {
  const [faces, updateFace, addFace, deleteFace] = useKeyedList(die.faces);
  const addEmptyFace = useCallbackWithArgs(addFace, { value: '' });

  const submit = useCallback(() => {
    const upface = Math.min(die.upface, faces.length - 1);
    // TS isn't smart enough to know that this is enforced by the type constraint
    // destructuring a union of objects doesn't understand the relation between the keys
    (saveDie as (newDie: typeof die) => void)({ ...die, faces, upface });
    close();
  }, [saveDie, die, faces, close]);

  useEffect(() => {
    if (faces.length === 0) addEmptyFace();
  }, [faces, addEmptyFace]);

  return (
    <ScrollView style={styles.scroll}>
      {faces.map((face) => (
        <EditDieFace
          deleteFace={deleteFace}
          faceKey={face.key}
          key={uuid2string(face.key)}
          updateFace={updateFace}
          value={face.value.toString()}
        />
      ))}

      <Button onPress={addEmptyFace} title="Add Face" />

      <ButtonsRow
        cancelAction={close}
        submitAction={submit}
      />
    </ScrollView>
  );
};

export default EditDieModal;
