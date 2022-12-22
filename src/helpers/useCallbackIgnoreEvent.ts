/* eslint-disable max-len */
import { useCallback } from 'react';
import type { DependencyList } from 'react';
import type { NativeSyntheticEvent } from 'react-native';

function isNativeEvent<T>(params: readonly unknown[]): params is [NativeSyntheticEvent<T>] {
  return !!(typeof params[0] === 'object' && params[0] && ('nativeEvent' in params[0]));
}

export type IgnoreEvents<T extends (...args: any) => any> = (...args: Parameters<T> | [NativeSyntheticEvent<unknown>]) => ReturnType<T>

const useCallbackIgnoreEvent = <T extends unknown[], R> (callback: (...params: Partial<T>) => R, dependencies: DependencyList):(IgnoreEvents<(...params: Partial<T>) => R>) => useCallback((...params) => {
  if (isNativeEvent(params)) { return (callback as (() => R))(); }
  return callback(...params);
}, dependencies);

export default useCallbackIgnoreEvent;
