import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CareersService } from './careers.service';
import { CareersController } from './careers.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Career, CareerSchema } from './entities/career.entity';

@Module({
  controllers: [CareersController],
  providers: [CareersService],
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      {
        name: Career.name,
        schema: CareerSchema,
      },
    ]),
  ],
  exports: [CareersService],
})
export class CareersModule {}
