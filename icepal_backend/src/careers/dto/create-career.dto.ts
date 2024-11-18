import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';
import {
  AcademicDegreeLevelEnum,
  ShiftsEnum,
  StudyPeriodEnum,
} from '../interfaces';

export class CreateCareerDto {
  @ApiProperty({ description: 'Name of the career' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the career' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Status of the career' })
  status: string;

  @ApiProperty({ description: 'Code of the career' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Academic degree level',
    enum: AcademicDegreeLevelEnum,
  })
  @IsEnum(AcademicDegreeLevelEnum)
  academicDegree: AcademicDegreeLevelEnum;

  @ApiProperty({ description: 'Duration of the career (e.g., 4 years)' })
  @IsOptional()
  timeDuration: string;

  @ApiProperty({
    description: 'Shifts available for this career',
    enum: ShiftsEnum,
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(ShiftsEnum, { each: true })
  shifts: ShiftsEnum[];

  @ApiProperty({ description: 'Area of study (e.g., Science, Arts)' })
  @IsString()
  @IsNotEmpty()
  area: string;

  @ApiProperty({
    description: 'Study period (e.g., Semester, Quarter)',
    enum: StudyPeriodEnum,
  })
  @IsEnum(StudyPeriodEnum)
  studyPeriod: StudyPeriodEnum;
}
