import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AIEnglishService {

  evaluateEssay(topic: string, essay: string) {
    
    console.log('Received gRPC Request:', topic);
    
    return { result: `Evaluated essay: ${topic}` };
  }
}
