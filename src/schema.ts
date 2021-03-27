import { DEFAULT_SCHEMA } from 'js-yaml';

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
  const schema = DEFAULT_SCHEMA.extend([
    envType,
    includeType,
    regexpType,
    streamType,
  ]);

  options.include.schema = schema;

  return schema;
}
