import type { UUID } from '../helpers/uuid';

export interface DieFace {
  readonly key: UUID;
  readonly value: number | string;
}
export interface NewDie {
  readonly faces: readonly DieFace[];
  readonly name: string;
}

export interface DieDefinition extends NewDie {
  readonly key: UUID;
}

export interface Die extends DieDefinition {
  readonly copyOf?: UUID;
  readonly upface: number;
}

export interface HasFaces {
  readonly faces: readonly DieFace[];
  readonly upface: number;
}

export const copyableAttributes = (die: Die): NewDie => {
  const {
    key: _key, copyOf: _copyOf, upface: _upface, ...updates
  } = die;
  return updates;
};
export const modifyDie = <T extends HasFaces>(updates: Partial<Die>, die: T): T => {
  const upface = Math.min(updates.upface ?? die.upface, (updates.faces ?? die.faces).length);
  return { ...die, ...updates, upface };
};
export const rollDie = (die: Die): Die => ({ ...die, upface: Math.floor(Math.random() * die.faces.length) });
export const deserializeDie = (die: DieDefinition): Die => ({ ...die, upface: 0 });
