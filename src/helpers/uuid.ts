import 'react-native-get-random-values';
import { v4 } from 'uuid';

export interface UUID {
  readonly _opaque: typeof UUID_SYMBOL;
}

export const uuid2string = (uuid: UUID): string => uuid as unknown as string;

declare const UUID_SYMBOL: unique symbol;

export default v4 as unknown as () => UUID;
