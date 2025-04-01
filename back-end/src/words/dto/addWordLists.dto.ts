import { IsNotEmpty,  IsString } from "class-validator";
import { WordDTO } from "./word.dto";

export class AddWordsListDTO {
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  readonly wordDTO: WordDTO;
}