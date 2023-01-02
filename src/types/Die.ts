export interface DieFace { readonly key: string; readonly value: number | string }
export interface DieDefinition {
  readonly faces: readonly DieFace[];
  readonly key: string;
  readonly name: string;
}

export interface Die extends DieDefinition {
  readonly upface: number;
}

export const rollDie = (die: Die): Die => ({ ...die, upface: Math.floor(Math.random() * die.faces.length) });
export const deserializeDie = (die: DieDefinition): Die => ({ ...die, upface: 0 });
