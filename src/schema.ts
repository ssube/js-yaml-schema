import { DEFAULT_SAFE_SCHEMA, Schema } from 'js-yaml';

import { envType } from './type/Env';
import { createInclude, IncludeOptions } from './type/Include';
import { regexpType } from './type/Regexp';
import { streamType } from './type/Stream';

export interface SchemaOptions {
  include: IncludeOptions;
}

/**
 * Safe schema with additional library types added.
 *
 * @public
 */
export function createSchema(options: SchemaOptions) {
  const includeType = createInclude(options.include);
  const schema = Schema.create([DEFAULT_SAFE_SCHEMA], [
    envType,
    includeType,
    regexpType,
    streamType,
  ]);

  options.include.schema = schema;

  return schema;
}
