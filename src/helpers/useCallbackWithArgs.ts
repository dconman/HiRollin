/* eslint-disable max-len */
import { useCallback } from 'react';

function useCallbackWithArgs<T extends unknown[], R>(callback: (...args: T) => R, ...args: T): () => R {
  return useCallback(() => callback(...args), [callback, args]);
}

export default useCallbackWithArgs;
