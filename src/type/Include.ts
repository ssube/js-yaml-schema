import { InvalidArgumentError, NotFoundError } from '@apextoaster/js-utils';
import { SAFE_SCHEMA, safeLoad, Schema, Type as YamlType } from 'js-yaml';
import { join } from 'path';

export type IncludeReader = (path: string, options: { encoding: string }) => string;

export interface IncludeSchema {
  exists: (path: string) => boolean;
  read: IncludeReader;
  resolve: (path: string) => string;
  schema: Schema;
}

/**
 * The schema to be used for included files. This is necessary to work around circular dependency errors.
 */
export const includeSchema: IncludeSchema = {
  exists: (path: string) => false,
  read: (path: string, encoding: object) => {
    throw new Error('read stub');
  },
  resolve: (path: string) => {
    throw new Error('resolve stub');
  },
  schema: SAFE_SCHEMA,
};

export const includeType = new YamlType('!include', {
  kind: 'scalar',
  resolve(path: string) {
    try {
      const canonical = resolvePath(path);
      // throws in node 11+
      if (includeSchema.exists(canonical)) {
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
      return safeLoad(includeSchema.read(resolvePath(path), {
        encoding: 'utf-8',
      }), {
        schema: includeSchema.schema,
      });
    } catch (err) {
      throw new InvalidArgumentError('error including file', err);
    }
  },
});

export function resolvePath(path: string): string {
  if (path[0] === '.') {
    return includeSchema.resolve(join(__dirname, path));
  } else {
    return includeSchema.resolve(path);
  }
}
