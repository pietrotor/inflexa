import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from 'src/common/entities';
import {
  AcademicDegreeLevelEnum,
  ShiftsEnum,
  StudyPeriodEnum,
} from '../interfaces';
import { Types } from 'mongoose';
import { generateUUID } from 'src/common/utils';

@Schema({ timestamps: true })
export class Career extends BaseEntity {
  @Prop({ type: String, default: generateUUID })
  _id: string;

  @ApiProperty({ description: 'Name of the career' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Description of the career' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ description: 'Status of the career' })
  @Prop({ required: true, default: true })
  status: string;

  @ApiProperty({ description: 'Code of the career' })
  @Prop({ required: true, index: true })
  code: string;

  @ApiProperty({
    description: 'Academic degree level',
    enum: AcademicDegreeLevelEnum,
  })
  @Prop({ required: true, enum: AcademicDegreeLevelEnum })
  academicDegree: AcademicDegreeLevelEnum;

  @ApiProperty({
    description: 'Duration of the career in time (e.g., 4 years)',
  })
  @Prop({ required: true })
  timeDuration: string;

  @ApiProperty({
    description: 'Shifts available for this career',
    enum: ShiftsEnum,
    isArray: true,
  })
  @Prop({ type: [String], enum: ShiftsEnum, required: true })
  shifts: ShiftsEnum[];

  @ApiProperty({ description: 'Area of study (e.g., Science, Arts)' })
  @Prop({ required: true })
  area: string;

  @ApiProperty({
    description: 'Study period (e.g., Semester, Quarter)',
    enum: StudyPeriodEnum,
  })
  @Prop({ required: true, enum: StudyPeriodEnum })
  studyPeriod: StudyPeriodEnum;

  @Prop({ type: String, ref: 'Institute', required: true })
  instituteId: String;
}

export const CareerSchema = SchemaFactory.createForClass(Career);
