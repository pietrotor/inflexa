import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities';
import { generateUUID } from 'src/common/utils';

@Schema({ _id: false })
class Theme {
  @ApiProperty({ description: 'Institute base logo', required: false })
  @Prop({ type: String })
  logo?: string;

  @ApiProperty({ description: 'Login background image', required: false })
  @Prop({ type: String })
  loginBackground?: string;

  @ApiProperty({ description: 'Theme color', required: false })
  @Prop({ type: String })
  color?: string;
}

@Schema()
export class Institute extends BaseEntity {
  @ApiProperty({ description: 'UUID' })
  @Prop({ type: String, default: generateUUID })
  _id: string;

  @ApiProperty({ description: 'The name of the institute' })
  @Prop({ required: true, unique: false })
  name: string;

  @ApiProperty({ description: 'The address of the institute' })
  @Prop({ default: null })
  address: string;

  @ApiProperty({ description: 'The contact number of the institute' })
  @Prop({ type: String, default: null })
  contactNumber?: string;

  @ApiProperty({ description: 'url of the institute where is the website' })
  @Prop({ type: String, default: null })
  url?: string;

  @ApiProperty({ description: '' })
  @Prop({ type: Theme })
  theme: Theme;
}

export const InstituteSchema = SchemaFactory.createForClass(Institute);
