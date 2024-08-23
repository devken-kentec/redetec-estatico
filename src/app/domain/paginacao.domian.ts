export interface RespostaPaginacao<T> {
  content: T;
  totalElements: number;
  size: number;
  number: number;
  totalPages: number;
}
