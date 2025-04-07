import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { JwtAuthGuard } from 'src/guards/JwtAuth.guard';
import { AddWordsListDTO } from './dto/addWordLists.dto';
import { UpdateWordsListDTO } from './dto/updateWordsList.dto';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('words-in-list')
  getWordsInList(@Query('wordsListId') wordsListId: string) {
    return this.wordsService.getWordsList(wordsListId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-words-list')
  deleteWordsList(@Param('wordsListId') wordsListId: string) {
    return this.wordsService.deleteWordsList(wordsListId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-words-list')
  createWordsList(@Body('name') wordsListName: string, @Request() req) {
    const userId = req.user.id;
    return this.wordsService.createWordsList(userId, wordsListName);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-word')
  addWord(@Body() addWordsListDTO: AddWordsListDTO) {
    console.log(addWordsListDTO);
    return this.wordsService.addWord(addWordsListDTO);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('update-words')
  updateWordsList(@Body() updateWordsListDTO: UpdateWordsListDTO) {
    return this.wordsService.updateWordsList(updateWordsListDTO);
  }

  @Get('word-syno-Anto')
  getWordSynoAnto(@Query('word') word: string) {
    return this.wordsService.findSynoAnto(word);
  }

  @Get('word-meaning')
  getWordMeaning(@Query('word') word: string) {
    return this.wordsService.searchWordMeaning(word);
  }
}
