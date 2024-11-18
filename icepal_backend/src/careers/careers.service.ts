import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Career } from './entities/career.entity';
import { Model } from 'mongoose';

@Injectable()
export class CareersService {
  constructor(
    @InjectModel(Career.name)
    private readonly careerModel: Model<Career>,
  ) {}
  async create(createCareerDto: CreateCareerDto, user: User) {
    const [existsCarrerName, existsCarrerCode] = await Promise.all([
      this.careerModel.findOne({
        name: createCareerDto.name.toUpperCase(),
        instituteId: user.institute.instituteId,
        deleted: false,
      }),
      this.careerModel.findOne({
        code: createCareerDto.code.toUpperCase(),
        instituteId: user.institute.instituteId,
        deleted: false,
      }),
    ]);

    if (existsCarrerName)
      throw new BadRequestException('Career name already exists');
    if (existsCarrerCode)
      throw new BadRequestException('Career code already exists');

    const newCareer = new this.careerModel({
      ...createCareerDto,
      name: createCareerDto.name.toUpperCase(),
      code: createCareerDto.code.toUpperCase(),
      createdBy: user._id,
      instituteId: user.institute.instituteId,
    });

    return await newCareer.save();
  }

  async findAll(user: User) {
    return await this.careerModel.find({
      deleted: false,
      instituteId: user.institute.instituteId,
    });
  }

  findOne(id: string) {
    const career = this.careerModel.findOne({
      _id: id,
      deleted: false,
    });

    if (!career) throw new NotFoundException('Career not found');

    return career;
  }

  async update(id: string, updateCareerDto: UpdateCareerDto, user: User) {
    const career = await this.careerModel.findOne({
      _id: id,
      instituteId: user.institute.instituteId,
      deleted: false,
    });

    if (!career) {
      throw new NotFoundException('Career not found');
    }

    if (updateCareerDto.name) {
      const existsCareer = await this.careerModel.findOne({
        name: updateCareerDto.name?.toUpperCase(),
        instituteId: user.institute.instituteId,
        deleted: false,
        _id: { $ne: id },
      });

      if (existsCareer) {
        throw new BadRequestException('Career name already exists');
      }

      career.name = updateCareerDto.name.toUpperCase();
    }

    if (updateCareerDto.code) {
      const existsCareer = await this.careerModel.findOne({
        code: updateCareerDto.code?.toUpperCase(),
        instituteId: user.institute.instituteId,
        deleted: false,
        _id: { $ne: id },
      });

      if (existsCareer) {
        throw new BadRequestException('Career code already exists');
      }

      career.code = updateCareerDto.code.toUpperCase();
    }

    if (updateCareerDto.description) {
      career.description = updateCareerDto.description;
    }

    if (updateCareerDto.academicDegree) {
      career.academicDegree = updateCareerDto.academicDegree;
    }

    if (updateCareerDto.timeDuration) {
      career.timeDuration = updateCareerDto.timeDuration;
    }

    if (updateCareerDto.shifts) {
      career.shifts = updateCareerDto.shifts;
    }

    if (updateCareerDto.area) {
      career.area = updateCareerDto.area;
    }

    if (updateCareerDto.studyPeriod) {
      career.studyPeriod = updateCareerDto.studyPeriod;
    }

    career.updatedBy = user.id;

    // Guardar los cambios
    await career.save();
    return career;
  }

  async remove(id: string, user: User) {
    const career = await this.findOne(id);

    career.deleted = true;
    career.deletedAt = new Date();
    career.deletedBy = user.id;
    await career.save();

    return 'Career deleted';
  }
}
