import { NepaliCurrencyPipe } from './nepalicurrency-pipe';

describe('NepaliCurrencyPipe', () => {
  let pipe: NepaliCurrencyPipe;

  beforeEach(() => {
    pipe = new NepaliCurrencyPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format positive numbers correctly', () => {
    expect(pipe.transform(100)).toBe('रू 100.00');
    expect(pipe.transform(1234)).toBe('रू 1,234.00');
    expect(pipe.transform(12345678.9)).toBe('रू 1,23,45,678.90');
  });

  it('should format negative numbers correctly', () => {
    expect(pipe.transform(-500)).toBe('- रू 500.00');
    expect(pipe.transform(-1234567.89)).toBe('- रू 12,34,567.89');
  });

  it('should handle string input', () => {
    expect(pipe.transform('123456')).toBe('रू 1,23,456.00');
    expect(pipe.transform('-98765.43')).toBe('- रू 98,765.43');
  });

  // it('should return empty string for null or undefined', () => {
  //   expect(pipe.transform(null)).toBe('');
  //   expect(pipe.transform(undefined)).toBe('');
  // });

  it('should return empty string for invalid string', () => {
    expect(pipe.transform('abc')).toBe('');
    expect(pipe.transform('123abc')).toBe('');
  });
});
