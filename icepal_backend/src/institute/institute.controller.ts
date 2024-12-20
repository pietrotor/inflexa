import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InstituteService } from './institute.service';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Institute')
@Controller('institutes')
export class InstituteController {
  constructor(private readonly instituteService: InstituteService) {}

  @Post()
  create(@Body() createInstituteDto: CreateInstituteDto) {
    return this.instituteService.create(createInstituteDto);
  }

  @Get()
  findAll() {
    return this.instituteService.findAll();
  }

  @Get('/web-configuration/:url')
  getWebConfiguration(@Param('url') url: string) {
    return this.instituteService.webConfiguration(url);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instituteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstituteDto: UpdateInstituteDto,
  ) {
    return this.instituteService.update(+id, updateInstituteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instituteService.remove(+id);
  }
}
