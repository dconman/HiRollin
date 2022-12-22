import useCallbackIgnoreEvent from './useCallbackIgnoreEvent';
import { useCallback, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import type { IgnoreEvents } from './useCallbackIgnoreEvent';

const useKeyedList = <T extends { readonly key: string }>(
  initialKeyedList: readonly T[], defaultValue: Omit<T, 'key'> | T,
): [
    readonly T[],
    (entry: T) => void,
    (...params: IgnoreEvents<[newEntry?: Omit<T, 'key'> | T]>) => void,
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
  const addEntry = useCallbackIgnoreEvent((newEntry: Omit<T, 'key'> | T = defaultValue) => {
    setKeyedList((currentList) => {
      const newEntries = [...currentList, { ...newEntry, key: uuidV4() } as T];
      return newEntries;
    });
  }, [defaultValue]);
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
