import { ApiQuery } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

// Función para aplicar los decoradores de Swagger de manera reutilizable
export function CommonPaginationSwagger({
  filterLabel,
}: {
  filterLabel?: string;
} = {}) {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      description: 'Page number to fetch, starts from 1.',
      required: false,
      type: Number,
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      description: 'Number of records per page.',
      required: false,
      type: Number,
      example: 10,
    }),
    ApiQuery({
      name: 'sort',
      description: 'Sort fields in "field:asc,field2:desc" format.',
      required: false,
      type: String,
      example: 'created_at:asc',
    }),
    ApiQuery({
      name: 'filter',
      description:
        filterLabel ?? 'Filter the results based on a match expression.',
      required: false,
      type: String,
      example: 'Jose perez',
    }),
  );
}
