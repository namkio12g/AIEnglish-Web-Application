import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OpenAiService } from './ai-device/openAi.service'; 
import { ConfigService } from '@nestjs/config';
import { GeminiAiService } from './ai-device/geminiAI.service';


@Controller('open-ai')
export class AIEnglishController {
  constructor(
    private readonly geminiAiService: GeminiAiService,
    private configService: ConfigService,
  ) {}
  @GrpcMethod('AIEnglishService', 'GenerateTopic')
  async generateTopic({ request }: { request: string }) {
     const result = await this.geminiAiService.generateTopic();
     return { result };
  }

  @GrpcMethod('AIEnglishService', 'RefineEssay')
  async refineEssay({ essay }: { essay: string }) {
     const result = await this.geminiAiService.refineEssay(essay);
     return { result };
  }


  @GrpcMethod('AIEnglishService', 'BrainstormTopic')
  async brainstormTopic({ topic }: { topic: string }) {
     const result = await this.geminiAiService.brainstormTopic(topic);
     return { result };
  }

  @GrpcMethod('AIEnglishService', 'FindSynoAno')
  async findSynoAno({ word }: { word: string }) {
    const result = await this.geminiAiService.findSynonymAndAnonyms(word);
    return { result };
  }

  @GrpcMethod('AIEnglishService', 'EvaluateEssay')
  async evaluateEssay({ topic, essay }: { topic: string; essay: string }) {
    const result= await this.geminiAiService.evaluateEssay(topic, essay);
    return { result };
  }
}
