import { BlobUrlPipe } from './blob-url.pipe';

describe('BlobUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new BlobUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
