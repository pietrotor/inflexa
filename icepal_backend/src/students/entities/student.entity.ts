import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types, Schema as MongooseSchema } from 'mongoose';
import { BaseEntity } from 'src/common/entities';
import {
  StudentCivilStatusEnum,
  StudentHighSchoolTypeEnum,
  StudentSexEnum,
} from '../interfaces';
import { generateUUID } from 'src/common/utils';

@Schema({ _id: false })
class OtherPhone {
  @ApiProperty({ description: 'Phone number', required: true })
  @Prop({ required: true })
  phone: string;

  @ApiProperty({ description: 'Phone detail', required: true })
  @Prop({ required: true })
  detail: string;
}

@Schema({ _id: false })
class Contact {
  @ApiProperty({ description: 'Area code', required: false })
  @Prop()
  area?: string | null;

  @ApiProperty({ description: 'Address', required: false })
  @Prop()
  address?: string | null;

  @ApiProperty({ description: 'House number', required: false })
  @Prop()
  houseNumber?: string | null;

  @ApiProperty({ description: 'Cell phone', required: false })
  @Prop()
  cellPhone?: string | null;

  @ApiProperty({ description: 'Phone', required: false })
  @Prop()
  phone?: string | null;

  @ApiProperty({ description: 'Work phone', required: false })
  @Prop()
  workPhone?: string | null;

  @ApiProperty({ description: 'Other phone details', required: false })
  @Prop({ type: OtherPhone })
  otherPhone?: OtherPhone | null;
}

@Schema({ _id: false })
class Document {
  @ApiProperty({
    description: 'Whether the document was received',
    required: true,
  })
  @Prop({ required: true })
  received: boolean;

  @ApiProperty({ description: 'Date of document submission', required: true })
  @Prop({ required: true, type: Date })
  date: Date;

  @ApiProperty({ description: 'Observation', required: false })
  @Prop()
  observation?: string | null;
}

@Schema({ _id: false })
class Documents {
  @ApiProperty({ description: 'Identification document', required: true })
  @Prop({ type: Document, required: true })
  identificationDocument: Document;

  @ApiProperty({ description: 'Birth certificate', required: true })
  @Prop({ type: Document, required: true })
  birthCertificate: Document;

  @ApiProperty({ description: 'Bachelor degree', required: true })
  @Prop({ type: Document, required: true })
  bachelorDegree: Document;

  @ApiProperty({ description: 'Grades card', required: false })
  @Prop({ type: Document })
  gradesCard: Document | null;

  @ApiProperty({ description: 'Pictures', required: true })
  @Prop({ type: Document, required: true })
  pictures: Document;
}

@Schema({ _id: false })
class HighSchool {
  @ApiProperty({
    description: 'Whether high school was completed',
    required: true,
  })
  @Prop({ required: true })
  completed: boolean;

  @ApiProperty({ description: 'Name of the high school', required: true })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Year of conclusion', required: true })
  @Prop({ required: true })
  conclusionYear: string;

  @ApiProperty({
    description: 'Type of the high school',
    enum: StudentHighSchoolTypeEnum,
  })
  @Prop({ required: true, enum: StudentHighSchoolTypeEnum })
  type: StudentHighSchoolTypeEnum;

  @ApiProperty({ description: 'Last course attended', required: false })
  @Prop()
  lastCourse?: string | null;
}

@Schema({ _id: false })
class University {
  @ApiProperty({ description: 'Career of the student', required: false })
  @Prop()
  career?: string;

  @ApiProperty({ description: 'Name of the university', required: false })
  @Prop()
  name?: string;

  @ApiProperty({
    description: 'Year of university completion',
    required: false,
  })
  @Prop()
  conclusionYear?: string | null;
}

@Schema({ _id: false })
class DegreeInstruction {
  @ApiProperty({ description: 'High school information', required: true })
  @Prop({ type: HighSchool, required: true })
  highSchool: HighSchool;

  @ApiProperty({ description: 'University information', required: false })
  @Prop({ type: University })
  university?: University | null;
}

@Schema({ timestamps: true })
export class Student extends BaseEntity {
  @Prop({
    type: String,
    default: () => generateUUID(),
  })
  _id: string;

  @ApiProperty({ description: 'The student code', example: '20240077' })
  @Prop({ required: true, trim: true, index: true })
  studentCode: string;

  @ApiProperty({ description: 'First name of the student', example: 'John' })
  @Prop({ required: true, maxlength: 100, trim: true })
  firstName: string;

  @ApiProperty({ description: 'Second name of the student', example: 'Doe' })
  @Prop({ required: true, maxlength: 100, trim: true })
  secondName: string;

  @ApiProperty({
    description: "Father's last name",
    example: 'Smith',
    required: false,
  })
  @Prop({ maxlength: 100, trim: true })
  fatherLastName: string | null;

  @ApiProperty({ description: "Mother's last name", example: 'Johnson' })
  @Prop({ maxlength: 100, trim: true })
  motherLastName: string;

  @ApiProperty({ description: 'Full name of the student', example: 'John Doe' })
  @Prop({ maxlength: 200, trim: true })
  fullName: string;

  @ApiProperty({
    description: 'Email address of the student',
    example: 'john.doe@example.com',
  })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ description: 'Birthdate of the student', type: Date })
  @Prop({ required: true, type: Date })
  birthdate: Date;

  @ApiProperty({ description: 'Age of the student', example: 20 })
  @Prop({ required: true })
  age: number;

  @ApiProperty({
    description: 'Identification number of the student',
    example: 'ABC123456',
  })
  @Prop({ required: true, index: true, trim: true })
  identificationNumber: string;

  @ApiProperty({ description: 'Gender of the student', enum: StudentSexEnum })
  @Prop({ required: true, enum: StudentSexEnum })
  sex: StudentSexEnum;

  @ApiProperty({ description: 'Contact information of the student' })
  @Prop({ type: Contact })
  contact: Contact;

  @ApiProperty({ description: "Father's name", required: false })
  @Prop()
  fatherName: string | null;

  @ApiProperty({ description: "Mother's name", required: false })
  @Prop()
  motherName: string | null;

  @ApiProperty({ description: "Tutor's name", required: false })
  @Prop()
  tutorName: string | null;

  @ApiProperty({ description: 'Documents submitted by the student' })
  @Prop({ type: Documents, required: true })
  documents: Documents;

  @ApiProperty({ description: 'Additional observations', required: false })
  @Prop()
  observation: string | null;

  @ApiProperty({ description: 'Profile picture URL', required: false })
  @Prop()
  picture: string | null;

  @ApiProperty({
    description: 'Civil status of the student',
    enum: StudentCivilStatusEnum,
  })
  @Prop({ enum: StudentCivilStatusEnum })
  civilStatus: StudentCivilStatusEnum;

  @ApiProperty({ description: 'Degree and education information' })
  @Prop({ type: DegreeInstruction })
  degreeInstruction: DegreeInstruction;

  @ApiProperty({ type: String })
  @Prop({
    type: String,
    ref: 'Institute',
    required: true,
    index: true,
    default: generateUUID,
  })
  instituteId: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
