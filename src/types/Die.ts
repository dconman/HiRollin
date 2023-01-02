import type { UUID } from '../helpers/uuid';

export interface DieFace {
  readonly key: UUID;
  readonly value: number | string;
}
export interface DieDefinition {
  readonly faces: readonly DieFace[];
  readonly key: UUID;
  readonly name: string;
}

export interface Die extends DieDefinition {
  readonly copyOf?: UUID;
  readonly upface: number;
}

export const rollDie = (die: Die): Die => ({ ...die, upface: Math.floor(Math.random() * die.faces.length) });
export const deserializeDie = (die: DieDefinition): Die => ({ ...die, upface: 0 });
