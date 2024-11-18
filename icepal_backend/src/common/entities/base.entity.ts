import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class BaseEntity extends Document {
  @ApiProperty({ description: 'User who created the entity', type: String })
  @Prop({ type: String, ref: 'User' })
  createdBy?: string;

  @ApiProperty({ description: 'When user was created', type: String })
  @Prop({ type: Date, default: Date.now })
  createdAt?: string;

  @ApiProperty({
    description: 'Indicates if the entity is deleted',
    default: false,
  })
  @Prop({ type: Boolean, default: false })
  deleted?: boolean;

  @ApiProperty({ description: 'User who deleted the entity', type: String })
  @Prop({ type: String, ref: 'User', default: null })
  updatedBy?: string;

  @ApiProperty({ description: 'When user where deleted', type: Date })
  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @ApiProperty({ description: 'User who deleted the entity', type: String })
  @Prop({ type: String, ref: 'User', default: null })
  deletedBy?: string;
}

export const BaseEntitySchema = SchemaFactory.createForClass(BaseEntity);
