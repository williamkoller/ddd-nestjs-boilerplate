export interface PaginatedResult<Result> {
  data: Result;
  total: number;
  page: number;
  pages: number;
}
