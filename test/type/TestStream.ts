import { NotFoundError } from '@apextoaster/js-utils';
import { expect } from 'chai';

import { streamType } from '../../src/type/Stream.js';

describe('stream config type', async () => {
  it('should resolve existing streams', async () => {
    expect(streamType.resolve('stdout')).to.equal(true);
  });

  it('should reject missing streams');
  it('should reject other properties', async () => {
    expect(() => streamType.resolve('env')).to.throw(NotFoundError);
  });

  it('should construct streams from process', async () => {
    expect(streamType.construct('stdout')).to.equal(process.stdout);
  });

  /**
   * TODO: throw
   */
  it('should throw when constructing missing streams', async () => {
    expect(streamType.construct('bob')).to.equal(undefined);
  });
});
