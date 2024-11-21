import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { InstituteService } from 'src/institute/institute.service';
import { CareersService } from 'src/careers/careers.service';
import { paginate, PaginationDto } from 'src/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly instituteService: InstituteService,
    private readonly careersService: CareersService,

    private readonly jwtService: JwtService,
  ) {}

  async find(id: string, user: User) {
    const userInstance = await this.userModel.findOne({
      _id: id,
      deleted: false,
      'institute.instituteId': user.institute.instituteId,
    });

    if (!userInstance) throw new BadRequestException('User not found');

    return userInstance;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, instituteId, name, lastName, ...userData } =
        createUserDto;

      const userExists = await this.userModel.findOne({
        email: userData.email,
        deleted: false,
        'institute.instituteId': instituteId,
      });

      if (userExists)
        throw new BadRequestException('User with that email already exists');

      const instituteInstance = await this.instituteService.findOne(
        instituteId,
      );

      const fullName = name.trim() + ' ' + lastName.trim();

      const user = await this.userModel.create({
        ...userData,
        name: name.trim(),
        lastName: lastName.trim(),
        fullName,
        password: bcrypt.hashSync(password, 10),
        institute: {
          instituteId: instituteInstance._id,
          instituteName: instituteInstance.name,
        },
      });

      delete user.password;

      const userAsObject = user.toObject();

      return {
        ...userAsObject,
        token: this.getJwtToken({
          id: user.id,
          instituteId: user.institute.instituteId,
        }),
      };
      // TODO: Retornar el JWT de acceso
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userModel
      .findOne({
        email,
        deleted: false,
      })
      .select('email password id institute');

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    console.log(user);

    return {
      token: this.getJwtToken({
        id: user.id,
        instituteId: user.institute.instituteId,
      }),
    };
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({
        id: user.id,
        instituteId: user.institute.instituteId,
      }),
    };
  }

  async current(user: User) {
    const [userInstance, instituteInstance, careersInstance] =
      await Promise.all([
        this.find(user.id, user),
        this.instituteService.findOne(user.institute.instituteId),
        this.careersService.findAll(user),
      ]);

    return {
      user: userInstance,
      institute: instituteInstance,
      careers: careersInstance,
    };
  }

  async getAllUsersPaginated({
    paginationDto,
    user,
  }: {
    paginationDto: PaginationDto;
    user: User;
  }) {
    const { filter, limit, page, sort } = paginationDto;

    const filters = {
      deleted: false,
      'institute.instituteId': user.institute.instituteId,
      ...(filter && {
        $or: [
          {
            fullName: { $regex: filter, $options: 'i' },
          },
          {
            email: { $regex: filter, $options: 'i' },
          },
        ],
      }),
    };

    return await paginate(this.userModel, {
      page,
      limit,
      sort: sort as any,
      filters,
    });
  }

  async update(id: string, user: User, updateUserDto: UpdateUserDto) {
    let fullName = null;
    if (updateUserDto.name || updateUserDto.lastName) {
      if (updateUserDto.name && updateUserDto.lastName) {
        fullName =
          updateUserDto.name.trim() + ' ' + updateUserDto.lastName.trim();
      } else {
        const userInstance = await this.find(id, user);
        if (updateUserDto.name) {
          fullName = updateUserDto.name.trim() + ' ' + userInstance.lastName;
        } else
          fullName = userInstance.name + ' ' + updateUserDto.lastName.trim();
      }
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: { ...updateUserDto, ...(fullName && { fullName }) } }, // Actualización parcial
      { new: true, runValidators: true }, // Retorna el documento actualizado
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  async getUserByEmail(user: User, body: { email: string }) {
    const userInstance = await this.userModel.findOne({
      deleted: false,
      email: body.email,
    });

    if (!userInstance) throw new NotFoundException('User not found');

    return userInstance;
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): any {
    throw new BadRequestException(error.response ?? 'Please check server logs');
  }
}
