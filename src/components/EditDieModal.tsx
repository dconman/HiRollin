import ButtonsRow from './ButtonsRow';
import EditDieFace from './EditDieFace';
import useCallbackWithArgs from '../helpers/useCallbackWithArgs';
import useKeyedList from '../helpers/useKeyedList';
import styles from '../styles';
import { useCallback } from 'react';
import { Button, ScrollView } from 'react-native';
import { v4 as uuidV4 } from 'uuid';

import type { Die } from '../types';
import type { FC } from 'react';

interface EditDieProps {
  readonly close: () => void;
  readonly die?: Die;
  readonly updateDie: (die: Die) => void;
}

const EditDieModal: FC<EditDieProps> = ({
  die = { faces: [], key: uuidV4(), name: '' }, updateDie, close,
}: EditDieProps) => {
  const [faceList, updateFace, addFace, deleteFace] = useKeyedList(die.faces);
  const addEmptyFace = useCallbackWithArgs(addFace, { value: '' });

  const submit = useCallback(() => {
    const updatedDie = { ...die, faces: faceList };
    updateDie(updatedDie);
    close();
  }, [updateDie, die, faceList, close]);
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

      <Button onPress={addEmptyFace} title="Add Face" />

      <ButtonsRow
        cancelAction={close}
        submitAction={submit}
      />
    </ScrollView>
  );
};

export default EditDieModal;
