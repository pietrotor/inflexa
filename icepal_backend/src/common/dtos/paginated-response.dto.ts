import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto {
  @ApiProperty({
    description: 'Total number of records.',
    type: Number,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number.',
    type: Number,
  })
  page: number;

  @ApiProperty({
    description: 'Number of records per page.',
    type: Number,
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of pages.',
    type: Number,
  })
  totalPages: number;
}
