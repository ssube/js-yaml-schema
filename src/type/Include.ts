import { InvalidArgumentError, NotFoundError, NotImplementedError } from '@apextoaster/js-utils';
import { SAFE_SCHEMA, safeLoad, Schema, Type as YamlType } from 'js-yaml';

export interface ReaderOptions {
  encoding: string;
}

export type IncludeReader = (path: string, options: ReaderOptions) => string;

export interface IncludeOptions {
  exists: (path: string) => boolean;
  join: (...path: Array<string>) => string;
  read: IncludeReader;
  resolve: (path: string) => string;
  schema: Schema;
}

/**
 * The schema to be used for included files. This is necessary to work around circular dependency errors.
 *
 * @public
 */
export const includeOptions: IncludeOptions = {
  exists: (path: string) => false,
  join: (...path: Array<string>) => {
    throw new NotImplementedError('join stub');
  },
  read: (path: string, encoding: ReaderOptions) => {
    throw new NotImplementedError('read stub');
  },
  resolve: (path: string) => {
    throw new NotImplementedError('resolve stub');
  },
  schema: SAFE_SCHEMA,
};

/**
 * @internal
 */
export const includeType = new YamlType('!include', {
  kind: 'scalar',
  resolve(path: string) {
    try {
      const canonical = resolvePath(path);
      // throws in node 11+
      if (includeOptions.exists(canonical)) {
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
      return safeLoad(includeOptions.read(resolvePath(path), {
        encoding: 'utf-8',
      }), {
        schema: includeOptions.schema,
      });
    } catch (err) {
      throw new InvalidArgumentError('error including file', err);
    }
  },
});

/**
 * @todo take root parameter instead of __dirname
 */
export function resolvePath(path: string): string {
  if (path[0] === '.') {
    return includeOptions.resolve(includeOptions.join(__dirname, path));
  } else {
    return includeOptions.resolve(path);
  }
}
