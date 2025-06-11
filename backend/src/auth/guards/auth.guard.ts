import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtservice: JwtService){}

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const token = authorization?.split(' ')[1];

        if(!token){
            throw new UnauthorizedException();
        }

        try{
            const tokenPayload = await this.jwtservice.verifyAsync(token);
            request.user ={
                userId: tokenPayload.sub,
                email: tokenPayload.email,
                role: tokenPayload.role
            }

            return true;
        }catch(error){
            throw new UnauthorizedException();
        }
    }
}