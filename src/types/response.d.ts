export interface CommonResponse {
    code: string
    data: any
    message: string
  }
  
  export interface PageableResponse {
    code: string
    data: Page
    message: string
  }
  
  export interface Sort {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  
  export interface Pageable {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
    sort: Sort
  }
  
  export interface Page {
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    pageable: Pageable
    size: number
    sort: Sort
    totalElements: number
    totalPages: number
    content: any[] | []
  }
  