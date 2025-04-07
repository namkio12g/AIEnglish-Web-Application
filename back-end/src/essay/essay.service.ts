import { BadRequestException, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { AIEnglishService } from '../AI_English/aiEnglishService.interface';
import axios from 'axios';
import { EvaluatingResultDTO } from './dto/evaluatingResult.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluatingHistory } from './entities/evaluatingHistory.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EssayService implements OnModuleInit {
  constructor(
    private configService: ConfigService,
    @InjectRepository(EvaluatingHistory)
    private evaluatingHistoryRepo: Repository<EvaluatingHistory>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
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
  

  async saveEvaluatingResult(evaluatingResultDTO: EvaluatingResultDTO,useId:string) {
    try {
      
      const user=await this.userRepo.findOne({where :{id:useId}});
      console.log("where")
       if(!user){
        throw new BadRequestException("Cant find user");
       }
      const evaluatingResult=new EvaluatingHistory(evaluatingResultDTO);
  
      evaluatingResult.user=user;
      return await this.evaluatingHistoryRepo.save(evaluatingResult)
    } catch (error) {
      console.log("the error:",error);
      throw new InternalServerErrorException("saving evaluating result error");
    }
    

    

  }

  async refineEssay(essay: string) {
    try {
      const response = await this.aiEnlishService
        .refineEssay({ essay: essay })
        .toPromise();
      return response;
    } catch (error) {
      console.error('gRPC Call Failed:', error);
    }
  }

 

  async evaluateEssay(topic: string, essay: string) {
    try {
      const response = await this.aiEnlishService
        .evaluateEssay({ topic: topic, essay: essay })
        .toPromise();
      return response
        ? JSON.parse(response['result'].replace(/```json|```/g, '').trim())
        : {};
    } catch (error) {
      console.error('gRPC Call Failed:', error);
    }
  }
}
