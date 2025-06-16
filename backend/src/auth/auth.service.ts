import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { loginDTO } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    //find user
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

    //login
    async authenticateUser(loginDto: loginDTO) {
        const user = await this.validateUser(loginDto)

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = { sub: user.id, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);

        const { password,...userData } = user; //take everything except the password
        return { accessToken, user: { ...userData } };
    }
}
