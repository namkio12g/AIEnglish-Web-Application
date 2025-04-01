import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)
    private userRepository: Repository<User> ){}
   async getWordsLists(userId:string){
    try {
      const userEntity = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['wordsLists'],
      });
      if(!userEntity){
        throw new BadRequestException('Cant find the words list');
      }
      return userEntity.wordsLists;
    } catch (error) {
      console.log('the error:', error);
      throw new InternalServerErrorException('Adding word error');
    }
  };
}
