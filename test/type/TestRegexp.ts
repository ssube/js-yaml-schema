import { expect } from 'chai';

import { regexpType } from '../../src/type/Regexp';

describe('regexp config type', async () => {
  it('match slashed strings', async () => {
    expect(regexpType.resolve('/foo/')).to.equal(true);
  });

  it('should match flags', async () => {
    const regexp: RegExp = regexpType.construct('/foo/g');
    expect(regexp.flags).to.equal('g');
  });

  it('should not match bare strings', async () => {
    expect(regexpType.resolve('foo')).to.equal(false);
  });

  it('should not match invalid flags', async () => {
    expect(regexpType.resolve('/foo/notrealflags')).to.equal(false);
  });

  it('should not match regex embedded in a longer string', async () => {
    expect(regexpType.resolve('some/regex/with-padding')).to.equal(false);
  });
});
