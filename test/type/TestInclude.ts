import { expect } from 'chai';
import { join } from 'path';

import { InvalidArgumentError } from '../../src/error/InvalidArgumentError';
import { NotFoundError } from '../../src/error/NotFoundError';
import { includeType } from '../../src/type/Include';
import { describeLeaks, itLeaks } from '../helpers/async';

const TEST_ROOT = '../test/type';

describeLeaks('include config type', async () => {
  itLeaks('should resolve existing files', async () => {
    expect(includeType.resolve(join(TEST_ROOT, 'include.yml'))).to.equal(true);
  });

  itLeaks('should throw when resolving missing files', async () => {
    expect(() => {
      includeType.resolve(join(TEST_ROOT, 'missing.yml'));
    }).to.throw(NotFoundError);
  });

  itLeaks('should construct data from file', async () => {
    expect(includeType.construct(join(TEST_ROOT, 'include.yml'))).to.equal('test');
  });

  itLeaks('should throw when constructing missing files', async () => {
    expect(() => {
      includeType.construct(join(TEST_ROOT, 'missing.yml'));
    }).to.throw(InvalidArgumentError);
  });
});
