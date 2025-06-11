import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { createUserDTO } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/:email')
    // @UseGuards(AuthGuard, RolesGuard)
    // @Roles('admin')
    async findUserByEmail(@Param('email') email: string) {
        return this.userService.findUserByEmail(email);
    }

    @Get('/')
    // @UseGuards(AuthGuard, RolesGuard)
    // @Roles('admin')
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
}
