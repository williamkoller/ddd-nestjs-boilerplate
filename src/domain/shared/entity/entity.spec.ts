import { Entity } from './entity';
import { UniqueEntityId } from '../unique-entity-id/unique-entity-id';

class TestEntity extends Entity<{ name: string }> {
  constructor(props: { name: string }, id?: UniqueEntityId) {
    super(props, id);
  }
}

describe('Entity', () => {
  let entity1: TestEntity;
  let entity2: TestEntity;
  let entity3: TestEntity;
  let entity4: TestEntity;

  beforeEach(() => {
    entity1 = new TestEntity({ name: 'Entity 1' }, new UniqueEntityId('1'));
    entity2 = new TestEntity({ name: 'Entity 2' }, new UniqueEntityId());
    entity3 = new TestEntity({ name: 'Entity 1' }, new UniqueEntityId('1'));
    entity4 = new TestEntity({ name: 'Entity 4' }, new UniqueEntityId());
  });

  it('should return true for equal entities with the same ID', () => {
    expect(entity1.equals(entity3)).toBe(true);
  });

  it('should return false for different entities with different IDs', () => {
    expect(entity1.equals(entity2)).toBe(false);
  });

  it('should return false for comparing with null', () => {
    expect(entity1.equals(null)).toBe(false);
  });

  it('should return false for comparing with undefined', () => {
    expect(entity1.equals(undefined)).toBe(false);
  });

  it('should return false for comparing with a non-entity object', () => {
    expect(entity1.equals({ name: 'Not an entity' } as any)).toBe(false);
  });
});
