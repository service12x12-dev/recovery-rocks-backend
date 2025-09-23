import * as migration_20250921_170741 from './20250921_170741';

export const migrations = [
  {
    up: migration_20250921_170741.up,
    down: migration_20250921_170741.down,
    name: '20250921_170741'
  },
];
