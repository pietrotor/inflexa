import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min, IsString } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'Number of rows per page',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({
    default: 1,
    description: 'Page number',
  })
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    default: 'created_at:asc',
    description: 'Sort fields (e.g., "created_at:asc,name:desc")',
  })
  @IsOptional()
  @IsString()
  sort?: string = 'created_at:asc';

  @ApiProperty({
    description: 'Filters as a JSON object (e.g., {"isActive":true})',
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  filter?: string;
}
