import * as migration_20250921_170741 from './20250921_170741';
import * as migration_20250925_160935 from './20250925_160935';

export const migrations = [
  {
    up: migration_20250921_170741.up,
    down: migration_20250921_170741.down,
    name: '20250921_170741',
  },
  {
    up: migration_20250925_160935.up,
    down: migration_20250925_160935.down,
    name: '20250925_160935'
  },
];
