import { UniqueEntityId } from './unique-entity-id';
import { randomUUID } from 'node:crypto';

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn(),
}));

describe('UniqueEntityId', () => {
  it('should generate a random UUID if no ID is provided', () => {
    const mockUUID = '123e4567-e89b-12d3-a456-426614174000';
    (randomUUID as jest.Mock).mockReturnValue(mockUUID);

    const entityId = new UniqueEntityId();

    expect(entityId.toValue()).toBe(mockUUID);
    expect(randomUUID).toHaveBeenCalled();
  });

  it('should use the provided ID if given', () => {
    const providedId = '123';
    const entityId = new UniqueEntityId(providedId);

    expect(entityId.toValue()).toBe(providedId);
  });

  it('should be an instance of Identifier', () => {
    const entityId = new UniqueEntityId();

    expect(entityId).toBeInstanceOf(UniqueEntityId);
  });

  it('should correctly compare two UniqueEntityId instances with the same value', () => {
    const id1 = new UniqueEntityId('123');
    const id2 = new UniqueEntityId('123');

    expect(id1.equals(id2)).toBe(true);
  });

  it('should return false when comparing with a different UniqueEntityId instance', () => {
    const id1 = new UniqueEntityId('123');
    const id2 = new UniqueEntityId('456');

    expect(id1.equals(id2)).toBe(false);
  });
});
