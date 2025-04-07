import { Injectable,CanActivate,ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
  }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req=context.switchToHttp().getRequest();
         if (!req.cookies.jwtToken)
           throw new UnauthorizedException("there are no token");
        const token = req.cookies.jwtToken;
        try {
            const user= this.jwtService.decode(token);
            if(!user)
                throw new UnauthorizedException('invalid token');
            req.user=user
        } catch (error) {
            throw new BadRequestException("Guards error");
        }

        return true;
    }
}