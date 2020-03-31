import { expect } from 'chai';

import { main } from '../src/app';

describe('main function', async () => {
  it('should exit 1', async () => expect(main([])).to.eventually.equal(1));
});
