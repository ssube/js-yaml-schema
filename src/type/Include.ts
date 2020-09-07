import { InvalidArgumentError, NotFoundError } from '@apextoaster/js-utils';
import { safeLoad, Schema, Type as YamlType } from 'js-yaml';

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
  schema: Schema;
}

/**
 * Instantiate an includer with closure over the provided options.
 * @public
 */
export function createInclude(options: IncludeOptions) {
  return new YamlType('!include', {
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
        return safeLoad(options.read(abs, {
          encoding: 'utf-8',
        }), {
          schema: options.schema,
        });
      } catch (err) {
        throw new InvalidArgumentError('error including file', err);
      }
    },
  });
}
