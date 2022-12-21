import { useCallback, useState } from 'react';

function useToggle(initialState: boolean | (() => boolean)): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState(initialState);
  const setTrue = useCallback(() => { setValue(true); }, []);
  const setFalse = useCallback(() => { setValue(false); }, []);
  const toggle = useCallback(() => { setValue((v) => !v); }, []);
  return [value, setTrue, setFalse, toggle];
}

export default useToggle;
