import 'react-native-get-random-values';
import { v4 } from 'uuid';

interface UUID extends String {
  readonly _opaque: typeof UUID_SYMBOL;
}

declare const UUID_SYMBOL: unique symbol;

export default v4 as unknown as () => UUID;
