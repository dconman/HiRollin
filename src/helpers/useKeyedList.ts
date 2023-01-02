import uuid from './uuid';
import { useCallback, useState } from 'react';
import type { UUID } from './uuid';

const useKeyedList = <T extends { readonly key: UUID }>(
  initialKeyedList: readonly T[] | (() => readonly T[]),
): [
    readonly T[],
    (updatedEntry: T) => void,
    (newEntry: Omit<T, 'key'> | T) => void,
    (deleteKey: UUID) => void] => {
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
  const deleteEntry = useCallback((deleteKey: UUID) => {
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
