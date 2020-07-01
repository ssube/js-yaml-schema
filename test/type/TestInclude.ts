import { InvalidArgumentError, NotFoundError } from '@apextoaster/js-utils';
import { expect } from 'chai';
import { join } from 'path';

import { IncludeSchema, includeSchema, includeType } from '../../src/type/Include';

const TEST_ROOT = '../test/type';

const ORIGINAL_SCHEMA: IncludeSchema = {
  ...includeSchema,
};

describe('include config type', async () => {
  beforeEach(() => {
    includeSchema.exists = () => true;
    includeSchema.read = () => 'test';
    includeSchema.resolve = (path: string) => path;
  });

  afterEach(() => {
    includeSchema.exists = ORIGINAL_SCHEMA.exists;
    includeSchema.read = ORIGINAL_SCHEMA.read;
    includeSchema.resolve = ORIGINAL_SCHEMA.resolve;
  });

  it('should resolve existing files', async () => {
    expect(includeType.resolve(join(TEST_ROOT, 'include.yml'))).to.equal(true);
  });

  it('should throw when resolving missing files', async () => {
    includeSchema.resolve = () => {
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
    includeSchema.read = () => {
      throw new InvalidArgumentError();
    };

    expect(() => {
      includeType.construct(join(TEST_ROOT, 'missing.yml'));
    }).to.throw(InvalidArgumentError);
  });
});
