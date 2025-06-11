import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class loginDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({ minLength: 8, minSymbols: 1, }, { message: 'Password must contain at least one special character and one capital letter', })
    password: string;
}