import { BadRequestException, Injectable,InternalServerErrorException,OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { AIEnglishService } from '../AI_English/aiEnglishService.interface';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AddWordsListDTO } from './dto/addWordLists.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './entities/word.entity';
import { WordsList } from './entities/wordsList.entity';
import { EntityManager } from 'typeorm';
import { UpdateWordsListDTO } from './dto/updateWordsList.dto';

@Injectable()
export class WordsService implements OnModuleInit {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Word) private wordRepository: Repository<Word>,
    @InjectRepository(WordsList)
    private wordsListRepository: Repository<WordsList>,
  ) {}
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'AIEnglish',
      url: 'localhost:50051',
      protoPath: 'proto/AI_English.proto',
    },
  })
  private client: ClientGrpc;
  private aiEnlishService: AIEnglishService;

  onModuleInit() {
    this.aiEnlishService =
      this.client.getService<AIEnglishService>('AIEnglishService');
  }

  async updateWordsList(updateWordsListDTO: UpdateWordsListDTO) {
    try {
      const wordsList = await this.wordsListRepository.findOne({
        where: { id: updateWordsListDTO.id },
        relations: ['words'],
      });
      if (!wordsList) {
        throw new BadRequestException('cant find the words list');
      }
      wordsList.words = wordsList.words.filter(
        (word) => !updateWordsListDTO.words.includes(word.id),
      );
      wordsList.wordsCount = wordsList.words.length;

      return this.wordsListRepository.save(wordsList);
    } catch (error) {
      console.log('the error:', error);
      throw new InternalServerErrorException('updating words list error');
    }
  }

  async getWordsList(wordsListId: string) {
    try {
      const wordList = await this.wordsListRepository.findOne({
        where: { id: wordsListId },
      });
      if (!wordList) {
        throw new BadRequestException('Cant find the words list');
      }
      return wordList;
    } catch (error) {
      console.log('the error:', error);
      throw new InternalServerErrorException('getting words list error');
    }
  }

  async deleteWordsList(wordsListId: string) {
    try {
      const wordList = await this.wordsListRepository.findOne({
        where: { id: wordsListId },
      });
      if (!wordList) {
        throw new BadRequestException('Cant find the words list');
      }
      return this.wordsListRepository.remove(wordList);
    } catch (error) {
      console.log('the error:', error);
      throw new InternalServerErrorException('deleting words list error');
    }
  }

  async addWord(addWordsListDTO: AddWordsListDTO) {
    try {
      let wordEntity = await this.wordRepository.findOne({
        where: { wordName: addWordsListDTO.wordDTO.wordName },
      });
      if (wordEntity == null) {
        wordEntity = await this.wordRepository.save(
          new Word(addWordsListDTO.wordDTO),
        );
      }
      const wordsList = await this.wordsListRepository.findOne({
        where: { id: addWordsListDTO.id },
        relations: ['words'],
      });
      if (!wordsList) {
        throw new BadRequestException('Cant find the words list');
      }
      wordsList.words.push(wordEntity);
      wordsList.wordsCount = wordsList.words.length;
      return this.wordsListRepository.save(wordsList);
    } catch (error) {
      console.log('the error:', error);
      throw new InternalServerErrorException('Adding word error');
    }
  }

  async searchWordMeaning(word: string) {
    try {
      const result = (
        await axios.get(
          `${this.configService.get<string>('english_dic_api')}${word}`,
        )
      ).data;
      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("searching word's meaning error");
    }
  }
  async findSynoAno(word: string) {
    try {
      const response = await this.aiEnlishService
        .findSynoAno({ word: word })
        .toPromise();
      return response
        ? JSON.parse(response['result'].replace(/```json|```/g, '').trim())
        : {};
    } catch (error) {
      console.error('gRPC Call Failed:', error);
       throw new InternalServerErrorException("finding word's Syno and Ano error");
    }
  }
}
