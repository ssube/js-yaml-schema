import { InvalidArgumentError, Maybe, mustDefault, NotFoundError } from '@apextoaster/js-utils';
import { DEFAULT_SCHEMA, load, Schema, Type as YamlType } from 'js-yaml';

export type ReaderEncoding = 'ascii' | 'utf-8';
export interface ReaderOptions {
  encoding: ReaderEncoding;
  flag?: string;
}

export type IncludeReader = (path: string, options: ReaderOptions) => string;

/**
 * Additional options for the include type.
 * @public
 */
export interface IncludeOptions {
  exists: (path: string) => boolean;
  join: (...path: Array<string>) => string;
  read: IncludeReader;
  resolve: (path: string) => string;
  schema: Maybe<Schema>;
}

export interface IncludeResult {
  includeType: YamlType;
  setSchema: (schema: Schema) => void;
}

const ERROR_INCLUDE_EXIST = 'included file does not exist';
const ERROR_INCLUDE_PARSE = 'error loading included file';


/**
 * Instantiate an include type with a copy of the provided options,
 * returning the include type and its schema setter.
 *
 * Includes must be resolved synchronously, which greatly limits where this can be used.
 *
 * @public
 */
export function createInclude(options: Readonly<IncludeOptions>): IncludeResult {
  const mutableOptions = {
    schema: mustDefault(options.schema, DEFAULT_SCHEMA),
  };

  const includeType = new YamlType('!include', {
    kind: 'scalar',
    resolve(path: string) {
      try {
        const canonical = options.resolve(path);
        // throws in node 11+
        if (options.exists(canonical)) {
          return true;
        } else {
          throw new NotFoundError(ERROR_INCLUDE_EXIST);
        }
      } catch (err) {
        if (err instanceof Error) {
          throw new NotFoundError(ERROR_INCLUDE_EXIST, err);
        } else {
          throw new NotFoundError(ERROR_INCLUDE_EXIST);
        }
      }
    },
    construct(path: string): unknown {
      try {
        const abs = options.resolve(path);
        return load(options.read(abs, {
          encoding: 'utf-8',
        }), {
          schema: mutableOptions.schema,
        });
      } catch (err) {
        if (err instanceof Error) {
          throw new InvalidArgumentError(ERROR_INCLUDE_PARSE, err);
        } else {
          throw new InvalidArgumentError(ERROR_INCLUDE_PARSE);
        }
      }
    },
  });

  // callback to avoid circular dependency (type must be created before schema)
  function setSchema(schema: Schema): void {
    mutableOptions.schema = schema;
  }

  return {
    includeType,
    setSchema,
  };
}
