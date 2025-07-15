import internalAllValid from './validate-internal.js';
import externalAllValid from './validate-external.js';

if (!internalAllValid || !externalAllValid) {
  process.exit(1);
}
