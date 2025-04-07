import { IsArray, IsNotEmpty,  IsString } from "class-validator";
import { WordDTO } from "./word.dto";

export class UpdateWordsListDTO {
  @IsString()
  readonly id: string;

  @IsArray()
  @IsNotEmpty()
  words: string[];
}