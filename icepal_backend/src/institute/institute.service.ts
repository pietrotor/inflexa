import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { Institute } from './entities/institute.entity';

@Injectable()
export class InstituteService {
  constructor(
    @InjectModel(Institute.name)
    private readonly instituteModel: Model<Institute>,
  ) {}
  async create(createInstituteDto: CreateInstituteDto) {
    const instituteInstance = new this.instituteModel(createInstituteDto);

    return await instituteInstance.save();
  }

  async findAll() {
    return await this.instituteModel.find({ deleted: false });
  }

  async findOne(id: string) {
    const instituteInstance = await this.instituteModel.findOne({
      _id: id,
      deleted: false,
    });

    if (!instituteInstance) throw new NotFoundException('Institute not found');

    return instituteInstance;
  }

  update(id: number, updateInstituteDto: UpdateInstituteDto) {
    return `This action updates a #${id} institute`;
  }

  remove(id: number) {
    return `This action removes a #${id} institute`;
  }

  async webConfiguration(url: string) {
    const instituteInstance = await this.instituteModel.findOne({
      deleted: false,
      url: url,
    });

    if (!instituteInstance) throw new NotFoundException('Institute not found');

    return {
      name: instituteInstance.name,
      pathLogo: instituteInstance.theme.logo,
      color: instituteInstance.theme.color,
      loginBackground: instituteInstance.theme.loginBackground,
    };
  }
}
