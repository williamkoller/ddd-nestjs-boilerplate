import { ArrayList } from './array-list';

class NumberArrayList extends ArrayList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe('ArrayList', () => {
  let ArrayList: NumberArrayList;

  beforeEach(() => {
    ArrayList = new NumberArrayList([1, 2, 3]);
  });

  test('should initialize with given items', () => {
    expect(ArrayList.getItems()).toEqual([1, 2, 3]);
    expect(ArrayList.getNewItems()).toEqual([]);
    expect(ArrayList.getRemovedItems()).toEqual([]);
  });

  test('should add new items correctly', () => {
    ArrayList.add(4);
    expect(ArrayList.getItems()).toContain(4);
    expect(ArrayList.getNewItems()).toContain(4);
  });

  test('should not add duplicate items', () => {
    ArrayList.add(1);
    expect(ArrayList.getItems().filter((item) => item === 1).length).toBe(1);
    expect(ArrayList.getNewItems()).not.toContain(1);
  });

  test('should remove items correctly', () => {
    ArrayList.remove(2);
    expect(ArrayList.getItems()).not.toContain(2);
    expect(ArrayList.getRemovedItems()).toContain(2);
  });

  test('should handle re-adding removed items', () => {
    ArrayList.remove(2);
    ArrayList.add(2);
    expect(ArrayList.getRemovedItems()).not.toContain(2);
    expect(ArrayList.getItems()).toContain(2);
  });

  test('should return correct size', () => {
    expect(ArrayList.size()).toBe(3);
    ArrayList.add(4);
    expect(ArrayList.size()).toBe(4);
    ArrayList.remove(1);
    expect(ArrayList.size()).toBe(3);
  });

  test('should identify empty list', () => {
    ArrayList = new NumberArrayList();
    expect(ArrayList.isEmpty()).toBe(true);
  });

  test('should sort items', () => {
    ArrayList = new NumberArrayList([3, 2, 1]);
    ArrayList.sort();
    expect(ArrayList.getItems()).toEqual([1, 2, 3]);
  });

  test('should check item existence', () => {
    expect(ArrayList.exists(2)).toBe(true);
    expect(ArrayList.exists(4)).toBe(false);
  });
});
