import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,private jwtService:JwtService,
  ) {}

  async getUserInfo(token:string)
  {
    if(!token)
      return null;
    try {
      const userDecoded=this.jwtService.decode(token);
      const user=await this.userRepository.findOne({where:{id:userDecoded.id}});
      return user;
    } catch (error) {
      return null;
    }
  };

  async getWordsLists(userId: string) {
    try {
      const userEntity = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['wordsLists'],
      });
      if (!userEntity) {
        throw new BadRequestException('Cant find the words list');
      }
      return userEntity.wordsLists;
    } catch (error) {
      console.log('the error:', error);
      throw new InternalServerErrorException('Adding word error');
    }
  }
}
