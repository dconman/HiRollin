import ButtonsRow from './ButtonsRow';
import SetDieFace from './SetDieFace';
import { uuid2string } from '../helpers/uuid';
import styles from '../styles';
import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';

import type { Die } from '../types/Die';
import type { FC } from 'react';

interface SetDieProps {
  readonly close: () => void;
  readonly die: Die;
  readonly saveDie: (die: Die) => void;
}

const SetDieModal: FC<SetDieProps> = ({
  die, saveDie, close,
}: SetDieProps) => {
  const [upface, setUpface] = useState(die.upface);

  const submit = useCallback(() => {
    saveDie({ ...die, upface });
    close();
  }, [saveDie, die, upface, close]);

  return (
    <ScrollView style={styles.scroll}>
      {die.faces.map((face, index) => (
        <SetDieFace
          index={index}
          key={uuid2string(face.key)}
          selected={index === upface}
          setUpface={setUpface}
          value={face.value.toString()}
        />
      ))}

      <ButtonsRow
        cancelAction={close}
        submitAction={submit}
      />
    </ScrollView>
  );
};

export default SetDieModal;
