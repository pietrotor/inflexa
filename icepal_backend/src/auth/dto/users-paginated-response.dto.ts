import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/common';
import { User } from '../entities/user.entity';

export class UsersPaginatedResponseDto extends PaginatedResponseDto {
  @ApiProperty({
    description: 'The list of users for the current page.',
    type: [User],
  })
  data: User[];
}
