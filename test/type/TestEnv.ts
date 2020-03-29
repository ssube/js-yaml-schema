import { expect } from 'chai';

import { NotFoundError } from '@apextoaster/js-utils';
import { envType } from '../../src/type/Env';
import { VERSION_INFO } from '../../src/version';

describe('env config type', async () => {
  it('should throw on missing variables', async () => {
    expect(() => {
      envType.resolve('DOES_NOT_EXIST_');
    }).to.throw(NotFoundError);
  });

  it('should resolve existing variables', async () => {
    expect(envType.resolve('CI_COMMIT_SHA')).to.equal(true);
  });

  it('should construct a value from variables', async () => {
    expect(envType.construct('CI_COMMIT_SHA')).to.equal(VERSION_INFO.git.commit);
  });
});
