export interface DieFace { readonly key: string; readonly value: number | string }
export interface Die {
  readonly faces: readonly DieFace[];
  readonly key: string;
  readonly name: string;
}
