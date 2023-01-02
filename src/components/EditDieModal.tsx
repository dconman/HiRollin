import ButtonsRow from './ButtonsRow';
import EditDieFace from './EditDieFace';
import useCallbackWithArgs from '../helpers/useCallbackWithArgs';
import useKeyedList from '../helpers/useKeyedList';
import { uuid2string } from '../helpers/uuid';
import styles from '../styles';
import { modifyDie } from '../types/Die';
import { useCallback, useEffect, useState } from 'react';
import { Button, ScrollView, TextInput } from 'react-native';
import type { Die } from '../types/Die';

import type { FC } from 'react';

interface EditDieProps {
  readonly close: () => void;
  readonly die: Die;
  readonly saveDie: (die: Die) => void;
}

interface NewDieProps {
  readonly close: () => void;
  readonly die?: Omit<Die, 'key' >;
  readonly saveDie: (die: Omit<Die, 'key'>) => void;
}

const EditDieModal: FC<EditDieProps | NewDieProps> = ({
  die = { faces: [], name: '', upface: 0 }, saveDie, close,
}: EditDieProps | NewDieProps) => {
  const [faces, updateFace, addFace, deleteFace] = useKeyedList(die.faces);
  const [name, setName] = useState(die.name);
  const addEmptyFace = useCallbackWithArgs(addFace, { value: '' });

  const submit = useCallback(() => {
    // TS isn't smart enough to know that this is enforced by the type constraint
    // destructuring a union of objects doesn't understand the relation between the keys
    (saveDie as (newDie: typeof die) => void)(modifyDie({ faces, name }, die));
    close();
  }, [saveDie, die, faces, name, close]);

  useEffect(() => {
    if (faces.length === 0) addEmptyFace();
  }, [faces, addEmptyFace]);

  const readonly = !!die.copyOf;

  return (
    <ScrollView style={styles.scroll}>
      <TextInput
        editable={!readonly}
        onChangeText={setName}
        style={styles.input}
        value={name}
      />

      {faces.map((face) => (
        <EditDieFace
          deleteFace={deleteFace}
          faceKey={face.key}
          key={uuid2string(face.key)}
          readonly={readonly}
          updateFace={updateFace}
          value={face.value.toString()}
        />
      ))}

      <Button disabled={readonly} onPress={addEmptyFace} title="Add Face" />

      <ButtonsRow
        cancelAction={close}
        submitAction={readonly ? undefined : submit}
      />
    </ScrollView>
  );
};

export default EditDieModal;
