import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMqWorkerModule } from './rabbitmq/rabbitMqWorker.module';
import { ConfigModule } from '@nestjs/config';
import { AIEnglishModule } from './ai-english/ai-english.module';
import config from 'config/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    AIEnglishModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
