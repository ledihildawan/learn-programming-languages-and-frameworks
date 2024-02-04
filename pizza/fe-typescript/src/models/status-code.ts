export interface ResponseOk<T> {
  page: number;
  items: T[];
  perPage: number;
  totalPages: number;
}

export interface ResponseBadRequest {
  data: any;
  code: number;
  message: string;
}
