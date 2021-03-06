import { NotFoundError } from '@apextoaster/js-utils';
import { Type as YamlType } from 'js-yaml';

const ALLOWED_STREAMS = new Set([
  'stdout',
  'stderr',
]);

/**
 * @public
 */
export const streamType = new YamlType('!stream', {
  kind: 'scalar',
  resolve(name: string) {
    if (ALLOWED_STREAMS.has(name) && Reflect.has(process, name)) {
      return true;
    } else {
      throw new NotFoundError(`process stream not found: ${name}`);
    }
  },
  construct(name: string) {
    return Reflect.get(process, name);
  },
});
