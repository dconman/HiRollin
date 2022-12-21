export interface DieFace { readonly value: number | string; readonly key: string }
export interface Die {
  readonly name: string;
  readonly key: string;
  readonly faces: readonly DieFace[];
}
