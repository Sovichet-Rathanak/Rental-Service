import { IsEmail, IsNotEmpty } from "class-validator";

export class loginDTO{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}