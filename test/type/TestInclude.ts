import { InvalidArgumentError, NotFoundError } from '@apextoaster/js-utils';
import { expect } from 'chai';
import { join } from 'path';

import { IncludeOptions, includeOptions, includeType } from '../../src/type/Include';

const TEST_ROOT = '../test/type';

const ORIGINAL_SCHEMA: IncludeOptions = {
  ...includeOptions,
};

describe('include config type', async () => {
  beforeEach(() => {
    includeOptions.exists = () => true;
    includeOptions.join = (...path) => path.join('/');
    includeOptions.read = () => 'test';
    includeOptions.resolve = (path: string) => path;
  });

  afterEach(() => {
    includeOptions.exists = ORIGINAL_SCHEMA.exists;
    includeOptions.join = ORIGINAL_SCHEMA.join;
    includeOptions.read = ORIGINAL_SCHEMA.read;
    includeOptions.resolve = ORIGINAL_SCHEMA.resolve;
  });

  it('should resolve existing files', async () => {
    expect(includeType.resolve(join(TEST_ROOT, 'include.yml'))).to.equal(true);
  });

  it('should throw when resolving missing files', async () => {
    includeOptions.resolve = () => {
      throw new NotFoundError();
    };

    expect(() => {
      includeType.resolve(join(TEST_ROOT, 'missing.yml'));
    }).to.throw(NotFoundError);
  });

  it('should construct data from file', async () => {
    expect(includeType.construct(join(TEST_ROOT, 'include.yml'))).to.equal('test');
  });

  it('should throw when constructing missing files', async () => {
    includeOptions.read = () => {
      throw new InvalidArgumentError();
    };

    expect(() => {
      includeType.construct(join(TEST_ROOT, 'missing.yml'));
    }).to.throw(InvalidArgumentError);
  });
});
