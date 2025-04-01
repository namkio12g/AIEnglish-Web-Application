import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
  getWordsInList(@Param('wordsListId') wordsListId: string) {
    return this.wordsService.getWordsList(wordsListId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('delete-words-list')
  deleteWordsList(@Param('wordsListId') wordsListId: string) {
    return this.wordsService.deleteWordsList(wordsListId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-word')
  addWord(@Body() addWordsListDTO: AddWordsListDTO) {
    return this.wordsService.addWord(addWordsListDTO);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('add-word')
  updateWordsList(@Body() updateWordsListDTO: UpdateWordsListDTO) {
    return this.wordsService.updateWordsList(updateWordsListDTO);
  }

  @Get('word-syno-ano')
  getWordSynoAno(@Param('word') word: string) {
    return this.wordsService.findSynoAno(word);
  }

  @Get('word-meaning')
  getWordMeaning(@Query('word') word: string) {
    return this.wordsService.searchWordMeaning(word);
  }
}
