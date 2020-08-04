import { DEFAULT_SAFE_SCHEMA, Schema } from 'js-yaml';

import { envType } from './type/Env';
import { includeOptions, includeType } from './type/Include';
import { regexpType } from './type/Regexp';
import { streamType } from './type/Stream';

/**
 * Safe schema with additional library types added.
 *
 * @public
 */
export const CONFIG_SCHEMA = Schema.create([DEFAULT_SAFE_SCHEMA], [
  envType,
  includeType,
  regexpType,
  streamType,
]);

includeOptions.schema = CONFIG_SCHEMA;
