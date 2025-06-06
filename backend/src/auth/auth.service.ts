import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { loginDTO } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    async validateUser(loginDto: loginDTO) {
        return this.userRepo.findOne(
            {
                where:
                {
                    email: loginDto.email,
                    password: loginDto.password
                },
            }
        )
    }

    async authenticateUser(loginDto: loginDTO){
        const user = await this.validateUser(loginDto)

        if(!user){
            throw new UnauthorizedException();
        }

        console.log(user);
        const {id, firstname} = user;

        const userInfo = {id, firstname}

        return {token: 'deez', ...userInfo};
    }
}
