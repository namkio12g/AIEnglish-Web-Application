import { IsNotEmpty, IsString } from "class-validator";
import { WordDTO } from "./word.dto";

export class createWordsListDTO {


  @IsString()
  readonly userId: string;

  @IsString()
  readonly name: String;
}