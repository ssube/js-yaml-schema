import { expect } from 'chai';
import { join } from 'path';

import { InvalidArgumentError, NotFoundError } from '@apextoaster/js-utils';
import { includeType } from '../../src/type/Include';

const TEST_ROOT = '../test/type';

describe('include config type', async () => {
  it('should resolve existing files', async () => {
    expect(includeType.resolve(join(TEST_ROOT, 'include.yml'))).to.equal(true);
  });

  it('should throw when resolving missing files', async () => {
    expect(() => {
      includeType.resolve(join(TEST_ROOT, 'missing.yml'));
    }).to.throw(NotFoundError);
  });

  it('should construct data from file', async () => {
    expect(includeType.construct(join(TEST_ROOT, 'include.yml'))).to.equal('test');
  });

  it('should throw when constructing missing files', async () => {
    expect(() => {
      includeType.construct(join(TEST_ROOT, 'missing.yml'));
    }).to.throw(InvalidArgumentError);
  });
});
