import { Injectable,CanActivate,ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
  }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req=context.switchToHttp().getRequest();
        const token=req.headers.authorization.split(' ')[1];
        if(!token){
            throw new UnauthorizedException();
        }
        try {
            req.user= this.jwtService.decode(token);
        } catch (error) {
            console.log("the error",error);
            throw new UnauthorizedException;
        }

        return true;
    }
}