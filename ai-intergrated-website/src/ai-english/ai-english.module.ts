import { Module } from '@nestjs/common';
import { AIEnglishController } from './ai-english.controller';
import { ConfigModule } from '@nestjs/config';
import { GeminiAiService } from './ai-device/geminiAI.service';

import OpenAI from 'openai';

@Module({
  imports: [ConfigModule],
  controllers: [AIEnglishController],
  providers: [GeminiAiService],
})
export class AIEnglishModule {}
