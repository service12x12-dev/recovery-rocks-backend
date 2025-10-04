import * as migration_20250921_170741 from './20250921_170741';
import * as migration_20250925_160935 from './20250925_160935';
import * as migration_20250927_161842 from './20250927_161842';
import * as migration_20250929_211944 from './20250929_211944';
import * as migration_20251002_164719 from './20251002_164719';
import * as migration_20251003_172210 from './20251003_172210';
import * as migration_20251004_185405 from './20251004_185405';
import * as migration_20251004_210456 from './20251004_210456';

export const migrations = [
  {
    up: migration_20250921_170741.up,
    down: migration_20250921_170741.down,
    name: '20250921_170741',
  },
  {
    up: migration_20250925_160935.up,
    down: migration_20250925_160935.down,
    name: '20250925_160935',
  },
  {
    up: migration_20250927_161842.up,
    down: migration_20250927_161842.down,
    name: '20250927_161842',
  },
  {
    up: migration_20250929_211944.up,
    down: migration_20250929_211944.down,
    name: '20250929_211944',
  },
  {
    up: migration_20251002_164719.up,
    down: migration_20251002_164719.down,
    name: '20251002_164719',
  },
  {
    up: migration_20251003_172210.up,
    down: migration_20251003_172210.down,
    name: '20251003_172210',
  },
  {
    up: migration_20251004_185405.up,
    down: migration_20251004_185405.down,
    name: '20251004_185405',
  },
  {
    up: migration_20251004_210456.up,
    down: migration_20251004_210456.down,
    name: '20251004_210456'
  },
];
