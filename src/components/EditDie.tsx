import ButtonsRow from './ButtonsRow';
import EditDieFace from './EditDieFace';
import useKeyedList from '../helpers/useKeyedList';
import styles from '../styles';
import { useCallback, useState } from 'react';
import { Button, ScrollView } from 'react-native';

import type { Die } from '../types';
import type { FC } from 'react';

interface EditDieProps {
  readonly die: Die;
  readonly updateDie: (die: Die) => void;
  readonly close: () => void;
}

const EditDie: FC<EditDieProps> = ({ die, updateDie, close }: EditDieProps) => {
  const [faceList, updateFace, addFace, deleteFace] = useKeyedList(die.faces, { value: '' });
  const [updatedDie, setUpdatedDie] = useState(die);

  const submit = useCallback(() => {
    updateDie(updatedDie);
    close();
  }, [updateDie, updatedDie, close]);
  return (
    <ScrollView style={styles.scroll}>
      {faceList.map((face) => (
        <EditDieFace
          deleteFace={deleteFace}
          faceKey={face.key}
          key={face.key}
          updateFace={updateFace}
          value={face.value.toString()}
        />
      ))}

      <Button onPress={addFace} title="Add Face" />

      <ButtonsRow
        cancelAction={close}
        submitAction={submit}
      />
    </ScrollView>
  );
};

export default EditDie;
