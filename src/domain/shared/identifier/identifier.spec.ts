import { Identifier } from './identifier';

describe('Identifier', () => {
  it('should correctly compare two identifiers with the same value', () => {
    const id1 = new Identifier(123);
    const id2 = new Identifier(123);

    expect(id1.equals(id2)).toBe(true);
  });

  it('should return false when comparing two identifiers with different values', () => {
    const id1 = new Identifier(123);
    const id2 = new Identifier(456);

    expect(id1.equals(id2)).toBe(false);
  });

  it('should return false when comparing with null', () => {
    const id = new Identifier(123);

    expect(id.equals(null)).toBe(false);
  });

  it('should return false when comparing with undefined', () => {
    const id = new Identifier(123);

    expect(id.equals(undefined)).toBe(false);
  });

  it('should return false when comparing with an object of a different class', () => {
    const id1 = new Identifier(123);
    const id2 = { value: 123 };

    expect(id1.equals(id2 as any)).toBe(false);
  });

  it('should correctly convert the identifier value to a string', () => {
    const id = new Identifier(123);

    expect(id.toString()).toBe('123');
  });

  it('should return the correct value when calling toValue', () => {
    const id = new Identifier(123);

    expect(id.toValue()).toBe(123);
  });
});
