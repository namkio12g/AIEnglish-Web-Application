import { Catch,ExceptionFilter,ArgumentsHost,HttpException, UnauthorizedException } from "@nestjs/common";
import { Request,Response } from "express";

@Catch(HttpException)
export class AIEnglishExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const response=host.switchToHttp().getResponse<Response>();
        const status = exception.getStatus();
        const message=exception.message;
        if(exception instanceof UnauthorizedException){
            return response.redirect('http://localhost:3000/auth/login');
        }
        response.status(status).json({
            statusCode:status,
            message:message,
        })
    }

}