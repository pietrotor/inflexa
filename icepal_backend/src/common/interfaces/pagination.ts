import { FilterQuery } from 'mongoose';
import { PaginatedResponseDto } from '../dtos';

enum PaginationSortEnum {
  ASC = 'asc',
  DESC = 'desc',
}

interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: Record<string, PaginationSortEnum.ASC | PaginationSortEnum.DESC>; // Cambiado a "asc" o "desc"
  filters?: FilterQuery<any>;
  populate?: string | Record<string, any> | Array<string | Record<string, any>>;
  aggregate?: any[];
}

class PaginatedResult<T> extends PaginatedResponseDto {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type { PaginationParams, PaginatedResult };

export { PaginationSortEnum };
