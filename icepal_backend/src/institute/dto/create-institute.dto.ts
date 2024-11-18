import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateInstituteDto {
  @ApiProperty()
  @IsString()
  name: string;
}
