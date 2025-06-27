import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { createUserDTO } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { ExpressAdapter, FileInterceptor } from '@nestjs/platform-express';
import { UserRole } from './user_role.enum';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:email')
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('UserRole.ADMIN')
  async findUserByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Get('/')
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('UserRole.ADMIN')
  async findOrGetAllUsers(@Query('name') name?: string): Promise<User[]> {
    if (name?.trim()) {
      return this.userService.findUserByName(name.trim());
    }
    return this.userService.getAllUsers();
  }

  @Post('/')
  async createUser(@Body() createUserDTO: createUserDTO): Promise<User> {
    return this.userService.createUser(createUserDTO);
  }

  @Post('/:id/profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPfp(
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadPfp(userId, file);
  }

  @Patch('/:id/role')
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('UserRole.ADMIN')
  async updateRole(
    @Param('id') userId: string,
    @Body('role') newRole: UserRole,
  ) {
    return this.userService.switchUserRole(userId, newRole);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    return this.userService.findUserById(userId);
  }
}
