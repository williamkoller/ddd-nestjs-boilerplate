export function Mapper<T, E = any>() {
  abstract class Mapper {
    public static toDomain?(raw: E): T;
    public static toPersistence?(domain: T): E;
    public static toDTO?(domain: T | null): object | null;
  }
  return Mapper;
}
