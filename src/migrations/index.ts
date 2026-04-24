import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260422_095934 from './20260422_095934';
import * as migration_20260422_103108 from './20260422_103108';
import * as migration_20260424_140548 from './20260424_140548';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260422_095934.up,
    down: migration_20260422_095934.down,
    name: '20260422_095934',
  },
  {
    up: migration_20260422_103108.up,
    down: migration_20260422_103108.down,
    name: '20260422_103108',
  },
  {
    up: migration_20260424_140548.up,
    down: migration_20260424_140548.down,
    name: '20260424_140548'
  },
];
