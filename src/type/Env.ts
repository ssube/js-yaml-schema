import { NotFoundError } from '@apextoaster/js-utils';
import { Type as YamlType } from 'js-yaml';

/**
 * @public
 */
export const envType = new YamlType('!env', {
  kind: 'scalar',
  resolve(name: string) {
    if (Reflect.has(process.env, name)) {
      return true;
    } else {
      throw new NotFoundError(`environment variable not found: ${name}`);
    }
  },
  construct(name: string) {
    return Reflect.get(process.env, name);
  },
});
