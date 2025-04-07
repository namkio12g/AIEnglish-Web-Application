
import { IsString } from "class-validator";
import { Column } from "typeorm";

export class WordDTO {

  @IsString()
  wordName: string;

  @IsString()
  phonetic: string;

  @IsString()
  audio: string;

  @IsString()
  definition: string;

  @IsString()
  example: string;

  @IsString()
  partOfSpeech: string;
}