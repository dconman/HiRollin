import styles from '../styles';
import { useCallback } from 'react';
import { Button, TextInput, View } from 'react-native';

import type { DieFace } from '../types';
import type { FC } from 'react';

interface EditDieFaceProps {
  readonly deleteFace: (key: string) => void;
  readonly faceKey: string;
  readonly updateFace: (newFace: DieFace) => void;
  readonly value: string;
}

const EditDieFace: FC<EditDieFaceProps> = ({
  deleteFace, faceKey, value, updateFace,
}) => {
  const deleteByKey = useCallback(() => { deleteFace(faceKey); }, [faceKey, deleteFace]);
  const updateByKey = useCallback(
    (newValue: string) => { updateFace({ key: faceKey, value: newValue }); },
    [faceKey, updateFace],
  );
  return (
    <View style={styles.editDieFaceRow}>
      <Button onPress={deleteByKey} title="X" />

      <TextInput
        key={faceKey}
        maxLength={6}
        onChangeText={updateByKey}
        style={styles.input}
        value={value}
      />
    </View>
  );
};

export default EditDieFace;
