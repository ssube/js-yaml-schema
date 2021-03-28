import { InvalidArgumentError, mustCoalesce, NotFoundError, Optional } from '@apextoaster/js-utils';
import { DEFAULT_SCHEMA, load, Schema, Type as YamlType } from 'js-yaml';

export type ReaderEncoding = 'ascii' | 'utf-8';
export interface ReaderOptions {
  encoding: ReaderEncoding;
  flag?: string;
}

export type IncludeReader = (path: string, options: ReaderOptions) => string;

export interface IncludeOptions {
  exists: (path: string) => boolean;
  join: (...path: Array<string>) => string;
  read: IncludeReader;
  resolve: (path: string) => string;
  schema: Optional<Schema>;
}

/**
 * Instantiate an includer with closure over the provided options.
 * @public
 */
export function createInclude(options: Readonly<IncludeOptions>) {
  const optionsCopy = {...options};

  const includeType = new YamlType('!include', {
    kind: 'scalar',
    resolve(path: string) {
      try {
        const canonical = options.resolve(path);
        // throws in node 11+
        if (options.exists(canonical)) {
          return true;
        } else {
          throw new NotFoundError('included file does not exist');
        }
      } catch (err) {
        throw new NotFoundError('included file does not exist', err);
      }
    },
    construct(path: string): unknown {
      try {
        const abs = options.resolve(path);
        return load(options.read(abs, {
          encoding: 'utf-8',
        }), {
          schema: mustCoalesce(optionsCopy.schema, DEFAULT_SCHEMA),
        });
      } catch (err) {
        throw new InvalidArgumentError('error including file', err);
      }
    },
  });

  // callback to avoid circular dependency (type must be created before schema)
  function setSchema(schema: Schema) {
    optionsCopy.schema = schema;
  };

  return {
    includeType,
    setSchema,
  };
}
