import { InvalidArgumentError, NotFoundError } from '@apextoaster/js-utils';
import { safeLoad, Schema, Type as YamlType } from 'js-yaml';

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
 * Instantiate an includer with closure over the provided options.
 * @public
 */
export function createInclude(includeOptions: IncludeOptions) {
  return new YamlType('!include', {
    kind: 'scalar',
    resolve(path: string) {
      try {
        const canonical = includeOptions.resolve(path);
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
        const abs = includeOptions.resolve(path);
        return safeLoad(includeOptions.read(abs, {
          encoding: 'utf-8',
        }), {
          schema: includeOptions.schema,
        });
      } catch (err) {
        throw new InvalidArgumentError('error including file', err);
      }
    },
  });
}
