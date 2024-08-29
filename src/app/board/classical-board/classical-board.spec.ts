import { ClassicalBoard } from './classical-board';

describe('ClassicalBoard', () => {
  it('should create an instance', () => {
    expect(new ClassicalBoard(10, 10)).toBeTruthy();
  });
});
