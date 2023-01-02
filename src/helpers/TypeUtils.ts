// eslint-disable-next-line import/prefer-default-export -- gonna be more
export function numberify(param: string): number | undefined {
  return (/^(\+|-)?\d*\.?\d+$/.exec(param)) ? +param : undefined;
}
