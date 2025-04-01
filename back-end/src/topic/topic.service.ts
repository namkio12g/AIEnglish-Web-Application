import { Injectable,OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { AIEnglishService } from '../AI_English/aiEnglishService.interface';
@Injectable()
export class TopicService implements OnModuleInit {
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
  async generateTopic() {
    try {
      const response = await this.aiEnlishService
        .generateTopic({ request: '' })
        .toPromise();
      return response;
    } catch (error) {
      console.error('gRPC Call Failed:', error);
    }
  }
  async brainstormTopic(topic: string) {
    try {
      const response = await this.aiEnlishService
        .brainstormTopic({ topic: topic })
        .toPromise();
      return response;
    } catch (error) {
      console.error('gRPC Call Failed:', error);
    }
  }
}
