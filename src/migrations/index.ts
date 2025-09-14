import * as migration_20250907_135008 from './20250907_135008';
import * as migration_20250914_152341 from './20250914_152341';

export const migrations = [
  {
    up: migration_20250907_135008.up,
    down: migration_20250907_135008.down,
    name: '20250907_135008',
  },
  {
    up: migration_20250914_152341.up,
    down: migration_20250914_152341.down,
    name: '20250914_152341'
  },
];
