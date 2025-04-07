import { Body, Controller, Get, Param, UseGuards,Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/JwtAuth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('words-lists')
  getWordsLists(@Param('userId') userId: string) {
    return this.userService.getWordsLists(userId);
  }

  @Get('get-info')
  getUserInfo(@Request() req:any) {
    if (!req.cookies.jwtToken) {
    }
    const token = req.cookies.jwtToken;
    return this.userService.getUserInfo(token);
  }

  
}
