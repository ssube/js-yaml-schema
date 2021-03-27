import { InvalidArgumentError, NotFoundError } from '@apextoaster/js-utils';
import { expect } from 'chai';
import { DEFAULT_SCHEMA } from 'js-yaml';
import { join } from 'path';

import { createInclude, IncludeOptions } from '../../src/type/Include';

const TEST_ROOT = '../test/type';

const TEST_OPTIONS: IncludeOptions = {
  exists: () => true,
  join: (...path) => path.join('/'),
  read: () => 'test',
  resolve: (path: string) => path,
  schema: DEFAULT_SCHEMA,
};

describe('include config type', async () => {
  it('should resolve existing files', async () => {
    const includeType = createInclude(TEST_OPTIONS);
    expect(includeType.resolve(join(TEST_ROOT, 'include.yml'))).to.equal(true);
  });

  it('should throw when resolving missing files', async () => {
    const includeType = createInclude({
      ...TEST_OPTIONS,
      resolve: () => {
        throw new NotFoundError();
      },
    });

    expect(() => {
      includeType.resolve(join(TEST_ROOT, 'missing.yml'));
    }).to.throw(NotFoundError);
  });

  it('should construct data from file', async () => {
    const includeType = createInclude(TEST_OPTIONS);
    expect(includeType.construct(join(TEST_ROOT, 'include.yml'))).to.equal('test');
  });

  it('should throw when constructing missing files', async () => {
    const includeType = createInclude({
      ...TEST_OPTIONS,
      read: () => {
        throw new InvalidArgumentError();
      },
    });

    expect(() => {
      includeType.construct(join(TEST_ROOT, 'missing.yml'));
    }).to.throw(InvalidArgumentError);
  });
});
