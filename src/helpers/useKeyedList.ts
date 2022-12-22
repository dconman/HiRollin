import { v4 as uuidV4 } from './uuid';
import { useCallback, useState } from 'react';

const useKeyedList = <T extends { readonly key: string }>(
  initialKeyedList: readonly T[],
): [
    readonly T[],
    (entry: T) => void,
    (newEntry: Omit<T, 'key'> | T) => void,
    (deleteKey: string) => void] => {
  const [keyedList, setKeyedList] = useState(initialKeyedList);
  const updateEntry = useCallback((entry: T) => {
    setKeyedList((currentList) => {
      const newEntries = [...currentList];
      const index = newEntries.findIndex(({ key }) => key === entry.key);
      newEntries[index] = entry;
      return newEntries;
    });
  }, []);
  const addEntry = useCallback((newEntry: Omit<T, 'key'> | T) => {
    setKeyedList((currentList) => {
      const newEntries = [...currentList, { ...newEntry, key: uuidV4() } as T];
      return newEntries;
    });
  }, []);
  const deleteEntry = useCallback((deleteKey: string) => {
    setKeyedList((currentList) => {
      const index = currentList.findIndex(({ key }) => key === deleteKey);
      const newEntries = [...currentList];
      newEntries.splice(index, 1);
      return newEntries;
    });
  }, []);
  return [keyedList, updateEntry, addEntry, deleteEntry];
};

export default useKeyedList;
