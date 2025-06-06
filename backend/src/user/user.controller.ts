import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { createUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/:email')
    async findUserByEmail(@Param('email') email: string) {
        return this.userService.findUserByEmail(email);
    }

    @Get('/')
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
