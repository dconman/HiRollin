import { Button, ScrollView } from 'react-native';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { v4 as uuidV4 } from '../helpers/uuid';
import styles from '../styles';
import type { Die } from '../types';
import ButtonsRow from './ButtonsRow';
import { numberify } from '../helpers/TypeUtils';
import EditDieFace from './EditDieFace';

interface EditDieProps {
  readonly die: Die;
  readonly updateDie: (die: Die) => void;
  readonly close: () => void;
}

const EditDie: FC<EditDieProps> = ({ die, updateDie, close }: EditDieProps) => {
  const [updatedDie, setUpdatedDie] = useState(die);
  const updateFaceByKey = useCallback((updatedKey: string, newFace: string) => {
    setUpdatedDie((dieToUpdate) => {
      const newFaces = [...dieToUpdate.faces];
      const index = newFaces.findIndex(({ key }) => key === updatedKey);
      newFaces[index] = { value: numberify(newFace) ?? newFace, key: updatedKey };
      return { ...dieToUpdate, faces: newFaces };
    });
  }, []);
  const deletedFaceByKey = useCallback((deletedKey: string) => {
    setUpdatedDie((dieToUpdate) => {
      const index = dieToUpdate.faces.findIndex(({ key }) => key === deletedKey);
      const newFaces = [...dieToUpdate.faces];
      newFaces.splice(index, 1);
      return { ...dieToUpdate, faces: newFaces };
    });
  }, []);
  const addFace = useCallback(() => {
    setUpdatedDie((dieToUpdate) => {
      const newFaces = [...dieToUpdate.faces, { key: uuidV4(), value: '' }];
      return { ...dieToUpdate, faces: newFaces };
    });
  }, []);
  const submit = useCallback(() => {
    updateDie(updatedDie);
    close();
  }, [updateDie, updatedDie, close]);
  return (
    <ScrollView style={styles.scroll}>
      {updatedDie.faces.map((face) => (
        <EditDieFace
          deleteFace={deletedFaceByKey}
          faceKey={face.key}
          key={face.key}
          updateFace={updateFaceByKey}
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
