import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<Student>,
  ) {}
  async create(createStudentDto: CreateStudentDto, user: User) {
    const exitsStudent = await this.studentModel.findOne({
      deleted: false,
      instituteId: createStudentDto.instituteId,
      identificationNumber: createStudentDto.identificationNumber,
    });

    if (exitsStudent)
      throw new BadRequestException('The student identification is not unique');

    const newStudent = new this.studentModel({
      ...createStudentDto,
      instituteId: createStudentDto.instituteId,
      createdBy: user._id,
    });

    return await newStudent.save();
  }

  findAll() {
    return `This action returns all students`;
  }

  async findOne(id: string) {
    const studentInstance = await this.studentModel.findOne({
      _id: id,
      deleted: false,
    });

    if (!studentInstance) throw new NotFoundException('Student not found');

    return studentInstance;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const updatedUser = await this.studentModel.findByIdAndUpdate(
      id,
      { $set: updateStudentDto }, // Actualización parcial
      { new: true, runValidators: true }, // Retorna el documento actualizado
    );

    if (!updatedUser) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return updatedUser;
  }

  async remove(id: string, user: User) {
    const studentInstance = await this.findOne(id);
    studentInstance.deleted = true;
    studentInstance.deletedAt = new Date();
    studentInstance.deletedBy = user.id;

    return `Student deleted`;
  }
}
