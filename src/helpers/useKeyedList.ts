import uuid from './uuid';
import { useCallback, useState } from 'react';

const useKeyedList = <T extends { readonly key: string }>(
  initialKeyedList: readonly T[] | (() => readonly T[]),
): [
    readonly T[],
    (updatedEntry: T) => void,
    (newEntry: Omit<T, 'key'> | T) => void,
    (deleteKey: string) => void] => {
  const [keyedList, setKeyedList] = useState(initialKeyedList);
  const updateEntry = useCallback((updatedEntry: T) => {
    setKeyedList((currentList) => {
      const newEntries = [...currentList];
      const index = newEntries.findIndex(({ key }) => key === updatedEntry.key);
      newEntries[index] = updatedEntry;
      return newEntries;
    });
  }, []);
  const addEntry = useCallback((newEntry: Omit<T, 'key'> | T) => {
    setKeyedList((currentList) => {
      const newEntries = [...currentList, { ...newEntry, key: uuid() } as T];
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
