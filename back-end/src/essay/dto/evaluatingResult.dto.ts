import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

import { v4 as uuidv4 } from 'uuid';

export class EvaluatingResultDTO{
  @IsNumber()
  @IsNotEmpty()
  TAScore: number;

  @IsNumber()
  @IsNotEmpty()
  CCScore: number;

  @IsNumber()
  @IsNotEmpty()
  LRScore: number;

  @IsNumber()
  @IsNotEmpty()
  GRAScore: number;

  @IsNumber()
  @IsNotEmpty()
  overallScore: number;

}
