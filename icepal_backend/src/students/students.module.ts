import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './entities/student.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
  ],
})
export class StudentsModule {}
