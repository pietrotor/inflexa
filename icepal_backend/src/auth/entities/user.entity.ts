import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, select: false, required: true })
  password: string;

  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: [String], default: ['user'] })
  roles: string[];
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
