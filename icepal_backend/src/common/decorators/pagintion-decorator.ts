import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationDto } from '../dtos';

export interface PaginationParams {
  page: number;
  limit: number;
  sort: Record<string, 'asc' | 'desc'>;
  filter: Record<string, any>;
}

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationDto => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    // Procesar paginación
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;

    // Procesar sort
    const sort: any = query.sort
      ? Object.fromEntries(
          query.sort.split(',').map((s) => {
            const [field, order] = s.split(':');
            return [field, order === 'asc' || order === 'desc' ? order : 'asc'];
          }),
        )
      : { created_at: 'asc' };

    // Procesar filtros
    const filter = query.filter;

    return { page, limit, sort, filter };
  },
);
