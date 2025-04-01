import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/JwtAuth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('words-lists')
  getWordsLista(@Param('userId') userId: string) {
    return this.userService.getWordsLists(userId);
  }
}
