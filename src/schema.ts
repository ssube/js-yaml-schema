import { mustDefault } from '@apextoaster/js-utils';
import { DEFAULT_SCHEMA, Schema } from 'js-yaml';

import { envType } from './type/Env.js';
import { createInclude, IncludeOptions } from './type/Include.js';
import { regexpType } from './type/Regexp.js';
import { streamType } from './type/Stream.js';

/**
 * @public
 */
export interface SchemaOptions {
  base?: Schema;
}

/**
 * @public
 */
export function createSchema(options: SchemaOptions): Schema {
  const base = mustDefault(options.base, DEFAULT_SCHEMA);

  return base.extend([
    envType,
    regexpType,
    streamType,
  ]);
}

/**
 * @public
 * @deprecated either use `createSchema` by itself, or `createInclude` and extend the schema yourself
 */
export interface IncludeSchemaOptions {
  base?: Schema;
  include: Readonly<Omit<IncludeOptions, 'schema'>>;
}

/**
 * Extended schema with the include type, and auto-configuration
 * of the include schema.
 *
 * @public
 * @deprecated either use `createSchema` by itself, or `createInclude` and extend the schema yourself
 */
export function createIncludeSchema(options: Readonly<IncludeSchemaOptions>): Schema {
  const base = mustDefault(options.base, DEFAULT_SCHEMA);
  const { includeType, setSchema } = createInclude({
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
