import { Module,OnModuleInit } from '@nestjs/common';
import { EssayController } from './essay.controller';
import { EssayService } from './essay.service';
import { Client } from '@nestjs/microservices';
import { EvaluatingHistory } from './entities/evaluatingHistory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([EvaluatingHistory,User])],
  controllers: [EssayController],
  providers: [EssayService]
})
export class EssayModule {}
