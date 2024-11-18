import { Module } from '@nestjs/common';
import { InstituteService } from './institute.service';
import { InstituteController } from './institute.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Institute, InstituteSchema } from './entities/institute.entity';

@Module({
  controllers: [InstituteController],
  providers: [InstituteService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Institute.name,
        schema: InstituteSchema,
      },
    ]),
  ],

  exports: [InstituteService],
})
export class InstituteModule {}
