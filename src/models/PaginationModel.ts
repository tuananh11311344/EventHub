export interface PaginatonModel {
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage: number;
  prevPage: number;
  totalPages: number;
  totalRecords: number;
}
