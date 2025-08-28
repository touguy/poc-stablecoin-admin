export interface CommonResponse {
  code: string;
  data: any;
  message: string;
}

export interface PageableResponse {
  code: string;
  data: Page;
  message: string;
}

export interface Pageable {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface Page {
  items: any[] | [];
  meta: Pageable;
}
