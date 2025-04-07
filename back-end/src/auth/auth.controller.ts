import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from '../guards/google-oauth.guard';
import { Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('logout')
  logout(@Request() req: any, @Response() res: any) {
    res.clearCookie('jwtToken', { httpOnly: true, secure: true });
    res.redirect('http://localhost:3100/');

  }

  @Get('login')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}



  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(
    @Request() req: any,
    @Response() res: ExpressResponse,
  ) {
    const user = req.user;
    const token = await this.authService.login(user);
    res.setHeader('Authorization', `Bearer ${token}`);
    res.cookie('jwtToken', token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000,
    });
    res.redirect('http://localhost:3100/');
  }
}
