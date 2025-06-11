import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { loginDTO } from './dto/auth-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: loginDTO) {
        return this.authService.authenticateUser(loginDto);
    }
}
