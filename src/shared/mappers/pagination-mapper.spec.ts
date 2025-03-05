import { PaginatedResult } from '../types/paginated-result';
import { PaginationMapper } from './pagination-mapper';

describe(PaginationMapper.name, () => {
  describe(PaginationMapper.getOffset.name, () => {
    describe('When page is zero', () => {
      it('Should return zero', () => {
        expect(PaginationMapper.getOffset({ page: 0, limit: 1 })).toEqual(0);
      });
    });
    describe('When page is negative', () => {
      it('Should return zero', () => {
        expect(PaginationMapper.getOffset({ page: -1, limit: 1 })).toEqual(0);
      });
    });
    describe('When limit is zero', () => {
      it('Should return zero', () => {
        expect(PaginationMapper.getOffset({ page: 1, limit: 0 })).toEqual(0);
      });
    });
    describe('When limit is negative', () => {
      it('Should return zero', () => {
        expect(PaginationMapper.getOffset({ page: 1, limit: -1 })).toEqual(0);
      });
    });
    it('Should return offset', () => {
      expect(PaginationMapper.getOffset({ page: 1, limit: 1 })).toEqual(0);
      expect(PaginationMapper.getOffset({ page: 1, limit: 10 })).toEqual(0);
      expect(PaginationMapper.getOffset({ page: 2, limit: 10 })).toEqual(10);
      expect(PaginationMapper.getOffset({ page: 3, limit: 10 })).toEqual(20);
    });
  });

  describe(PaginationMapper.toResult.name, () => {
    it('Should return paginated result', () => {
      const data: number[] = [1];
      const expectedResult: PaginatedResult<number[]> = {
        data,
        page: 1,
        pages: 1,
        total: 2,
      };

      const result = PaginationMapper.toResult({
        data,
        limit: 2,
        page: 1,
        total: 2,
      });

      expect(result).toEqual(expectedResult);
    });
  });
});
