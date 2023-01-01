export interface DieFace { readonly key: string; readonly value: number | string }
export interface DieDefinition {
  readonly faces: readonly DieFace[];
  readonly key: string;
  readonly name: string;
}

export interface Die extends DieDefinition {
  readonly upface: number;
}
