export function numberify(param: string): number | undefined {
  return (/^(\+|-)?\d*\.?\d+$/.exec(param)) ? +param : undefined;
}

export function functionify<FuncType extends (
  ...a: readonly unknown[]) => unknown>(
  param: unknown,
  arity: Parameters<FuncType>['length'],
): FuncType | undefined {
  return typeof param === 'function' && param.length === arity ? param as FuncType : undefined;
}

const noOp = (): void => {};

export function noOpify(
  param: 'NoOp' | (() => void),
): () => void {
  return param === 'NoOp' ? noOp : param;
}

export const NoOp = 'NoOp' as const;
