import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CareersService } from './careers.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Careers')
@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Post()
  @Auth()
  create(@Body() createCareerDto: CreateCareerDto, @GetUser() user: User) {
    return this.careersService.create(createCareerDto, user);
  }

  @Get()
  @Auth()
  findAll(@GetUser() user: User) {
    return this.careersService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.careersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCareerDto: UpdateCareerDto,
    @GetUser() user: User,
  ) {
    return this.careersService.update(id, updateCareerDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.careersService.remove(id, user);
  }
}
