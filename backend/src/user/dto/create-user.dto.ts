import { IsEmail, IsEnum, IsString, IsStrongPassword } from "class-validator";
import { MatchPassword } from "../decorator/match_password.decorator";
import { UserRole } from "../user_role.enum";

export class createUserDTO {
    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword({minLength: 8, minSymbols: 1,}, {message: 'Password must contain at least one special character and one capital letter',})
    password: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsString()
    @MatchPassword('password', {message: 'Password does not match'})
    confirm_password: string;
}