import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { BaseEntity } from 'src/common/entities';
import { generateUUID } from 'src/common/utils';

export class UserInstituteDto {
  @ApiProperty({ description: 'Institute ID', example: '12345' })
  instituteId: string;

  @ApiProperty({ description: 'Institute Name', example: 'Institute Name' })
  instituteName: string;
}

@Schema()
export class User extends BaseEntity {
  @ApiProperty({ type: String })
  @Prop({ type: String, default: generateUUID })
  _id: String;

  @ApiProperty()
  @Prop({ type: String, unique: true, required: true })
  email: string;

  @ApiProperty()
  @Prop({ type: String, select: false, required: true })
  password: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  fullName: string;

  @ApiProperty()
  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @ApiProperty()
  @Prop({ type: [String], default: ['user'] })
  roles: string[];

  @ApiProperty({
    description: 'Institute object containing ID and name',
    type: UserInstituteDto,
  })
  @Prop({
    type: {
      instituteId: { type: String, ref: 'Institute', required: true },
      instituteName: { type: String, required: true },
    },
    _id: false,
    required: true,
  })
  institute: {
    instituteId: string;
    instituteName: string;
  };
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
