import { mustCoalesce } from '@apextoaster/js-utils';
import { DEFAULT_SCHEMA, Schema } from 'js-yaml';

import { envType } from './type/Env';
import { createInclude, IncludeOptions } from './type/Include';
import { regexpType } from './type/Regexp';
import { streamType } from './type/Stream';

export interface SchemaOptions {
  base?: Schema;
  include: Readonly<Omit<IncludeOptions, 'schema'>>;
}

/**
 * Safe schema with additional library types added.
 *
 * @public
 */
export function createSchema(options: Readonly<SchemaOptions>) {
  const base = mustCoalesce(options.base, DEFAULT_SCHEMA);
  const {includeType, setSchema} = createInclude({
    ...options.include,
    schema: base,
  });
  const schema = base.extend([
    envType,
    includeType,
    regexpType,
    streamType,
  ]);

  setSchema(schema);

  return schema;
}
