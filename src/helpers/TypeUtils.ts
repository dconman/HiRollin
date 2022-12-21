export function numberify(param: string): number | undefined {
  return (/^(\+|-)?\d*\.?\d+$/.exec(param)) ? +param : undefined;
}

export function functionify<FuncType>(param: unknown): FuncType | undefined {
  return typeof param === 'function' ? param as FuncType : undefined;
}
