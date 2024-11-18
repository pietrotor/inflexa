import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsBoolean,
  ValidateNested,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  StudentCivilStatusEnum,
  StudentHighSchoolTypeEnum,
  StudentSexEnum,
} from '../interfaces';
import { Types } from 'mongoose';
import { DateTransformer } from 'src/common/transformers/dateTranformer';

// DTO para 'otherPhone'
export class OtherPhoneDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  detail: string;
}

// DTO para 'contact'
export class ContactDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  area?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  houseNumber?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cellPhone?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  workPhone?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => OtherPhoneDto)
  otherPhone?: OtherPhoneDto | null;
}

// DTO para el detalle del documento
export class DocumentDetailDto {
  @ApiProperty()
  @IsBoolean()
  received: boolean;

  @ApiProperty()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value).getTime()) // Transformar ISO a timestamp
  @IsNumber()
  date: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  observation?: string | null;
}

// DTO para 'pictures'
export class PicturesDto {
  @ApiProperty()
  @IsBoolean()
  received: boolean;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsString()
  observation: string;
}

// DTO para 'documents'
export class DocumentsDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => DocumentDetailDto)
  identificationDocument: DocumentDetailDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => DocumentDetailDto)
  birthCertificate: DocumentDetailDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => DocumentDetailDto)
  bachelorDegree: DocumentDetailDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => DocumentDetailDto)
  gradesCard?: DocumentDetailDto | null;

  @ApiProperty()
  @ValidateNested()
  @Type(() => PicturesDto)
  pictures: PicturesDto;
}

// DTO para la educación secundaria
export class HighSchoolDto {
  @ApiProperty()
  @IsBoolean()
  completed: boolean;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastCourse?: string | null;

  @ApiProperty()
  @IsString()
  conclusionYear: string;

  @ApiProperty({ enum: StudentHighSchoolTypeEnum })
  @IsEnum(StudentHighSchoolTypeEnum)
  type: StudentHighSchoolTypeEnum;
}

// DTO para la educación universitaria
export class UniversityDto {
  @ApiProperty()
  @IsString()
  career: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  conclusionYear?: string | null;
}

// DTO para profesión
export class ProfessionDto {
  @ApiProperty()
  @IsString()
  name: string;
}
// DTO para 'degreeInstruction'
export class DegreeInstructionDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => HighSchoolDto)
  highSchool: HighSchoolDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => UniversityDto)
  university?: UniversityDto | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProfessionDto)
  profession?: ProfessionDto | null;
}

// DTO principal 'CreateStudentDto'
export class CreateStudentDto {
  constructor(partial: Partial<CreateStudentDto>) {
    Object.assign(this, partial);
    this.instituteId = new Types.ObjectId(this.instituteId);
  }

  @ApiProperty({ description: 'The student code', example: '20240077' })
  @IsString()
  @IsNotEmpty()
  studentCode: string;

  @ApiProperty({ description: 'First name of the student', example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Second name of the student', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  secondName: string;

  @ApiProperty({
    description: "Father's last name",
    example: 'Smith',
    required: false,
  })
  @IsOptional()
  @IsString()
  fatherLastName: string | null;

  @ApiProperty({ description: "Mother's last name", example: 'Johnson' })
  @IsString()
  @IsNotEmpty()
  motherLastName: string;

  @ApiProperty({ description: 'Full name of the student', example: 'John Doe' })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({
    description: 'Email address of the student',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Birthdate of the student', type: Date })
  @Type(() => Date)
  @IsNotEmpty()
  @Transform(({ value }) => new DateTransformer().to(value), {
    toClassOnly: true,
  })
  birthdate: Date;

  @ApiProperty({ description: 'Age of the student', example: 20 })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    description: 'Identification number of the student',
    example: 'ABC123456',
  })
  @IsString()
  @IsNotEmpty()
  identificationNumber: string;

  @ApiProperty({ description: 'Gender of the student', enum: StudentSexEnum })
  @IsEnum(StudentSexEnum)
  @IsNotEmpty()
  sex: StudentSexEnum;

  @ApiProperty({
    description: 'Contact information of the student',
    type: ContactDto,
  })
  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @ApiProperty({ description: "Father's name", required: false })
  @IsOptional()
  @IsString()
  fatherName: string | null;

  @ApiProperty({ description: "Mother's name", required: false })
  @IsOptional()
  @IsString()
  motherName: string | null;

  @ApiProperty({ description: "Tutor's name", required: false })
  @IsOptional()
  @IsString()
  tutorName: string | null;

  @ApiProperty({
    description: 'Documents submitted by the student',
    type: DocumentsDto,
  })
  @ValidateNested()
  @Type(() => DocumentsDto)
  documents: DocumentsDto;

  @ApiProperty({ description: 'Additional observations', required: false })
  @IsOptional()
  @IsString()
  observation: string | null;

  @ApiProperty({ description: 'Profile picture URL', required: false })
  @IsOptional()
  @IsString()
  picture: string | null;

  @ApiProperty({
    description: 'Civil status of the student',
    enum: StudentCivilStatusEnum,
  })
  @IsEnum(StudentCivilStatusEnum)
  civilStatus: StudentCivilStatusEnum;

  @ApiProperty({
    description: 'Degree and education information',
    type: DegreeInstructionDto,
  })
  @ValidateNested()
  @Type(() => DegreeInstructionDto)
  degreeInstruction: DegreeInstructionDto;

  @ApiProperty({ type: Types.ObjectId })
  @IsNotEmpty()
  @IsUUID()
  instituteId: Types.ObjectId;
}
