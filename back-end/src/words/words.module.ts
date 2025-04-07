import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsList } from './entities/wordsList.entity';
import { Word } from './entities/word.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WordsList,Word,User])],
  providers: [WordsService],
  controllers: [WordsController]
})
export class WordsModule {}
