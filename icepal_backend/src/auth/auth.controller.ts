import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { IncomingHttpHeaders } from 'http';

import { AuthService } from './auth.service';
import { RawHeaders, GetUser, Auth } from './decorators';
import { RoleProtected } from './decorators/role-protected.decorator';

import { CreateUserDto, LoginUserDto, UsersPaginatedResponseDto } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';
import {
  CommonPaginationSwagger,
  PaginatedResponseDto,
  Pagination,
  PaginationDto,
} from 'src/common';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Auth(ValidRoles.user, ValidRoles.admin)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('current')
  @Auth(ValidRoles.user)
  current(@GetUser() user: User) {
    return this.authService.current(user);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('users')
  @CommonPaginationSwagger({
    filterLabel: 'Filter users by field "fullName"',
  })
  @Auth(ValidRoles.user)
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully',
    type: UsersPaginatedResponseDto,
  })
  getUsers(
    @GetUser() user: User,
    @Pagination() paginationParams: PaginationDto,
  ) {
    return this.authService.getAllUsersPaginated({
      user,
      paginationDto: paginationParams,
    });
  }
}
