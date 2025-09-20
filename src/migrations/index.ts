import * as migration_20250907_135008 from './20250907_135008';
import * as migration_20250914_152341 from './20250914_152341';
import * as migration_20250914_152639 from './20250914_152639';
import * as migration_20250920_202630 from './20250920_202630';

export const migrations = [
  {
    up: migration_20250907_135008.up,
    down: migration_20250907_135008.down,
    name: '20250907_135008',
  },
  {
    up: migration_20250914_152341.up,
    down: migration_20250914_152341.down,
    name: '20250914_152341',
  },
  {
    up: migration_20250914_152639.up,
    down: migration_20250914_152639.down,
    name: '20250914_152639',
  },
  {
    up: migration_20250920_202630.up,
    down: migration_20250920_202630.down,
    name: '20250920_202630'
  },
];
