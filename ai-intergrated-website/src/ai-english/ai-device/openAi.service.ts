import { Injectable, OnModuleInit } from '@nestjs/common';
import { AiDeviceInterface } from '../ai-device.interface';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
const MODEL = 'gpt-3.5-turbo';
const TEMPERATURE = 0.7;
@Injectable()
export class OpenAiService implements AiDeviceInterface {
  private openai: OpenAI;
  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('openai_api_key');
    this.openai = new OpenAI({ apiKey });
  }
  generateTopic() {
    throw new Error('Method not implemented.');
  }
  refineEssay(essay: string) {
    throw new Error('Method not implemented.');
  }

  evaluateEssay(topic: string, essay: string) {
    const devContent =
      'You are an AI essay evaluator. Analyze the given essay based on relevance to the topic, grammar,     coherence, and spelling. Return the result in JSON format.';
    const userContent = `Evaluate the following essay based on the topic: "${topic}".
                            If topic or essay is invalid ,the answer should be only NO.
                            If not Provide a structured JSON response with:
                            - relevance_score (1-10)
                            - grammar_score (1-10)
                            - coherence_score (1-10)
                            - spelling_score (1-10)
                            - strength_feedbacks (short summary of strengths)
                            - weaknesses_feedbacks (short summary of weaknesses)
                            
                            Essay: """${essay}""" 
                            
                            Return JSON format only, no additional text.`;

    return this.callAIApi({
      devContent: devContent,
      userContent: userContent,
    });
  }
  brainstormTopic(topic: string) {}
  findSynonymAndAntonyms(word: string) {}
  async callAIApi(request: Record<string, any>) {
    console.log(request['devContent']);
    const response = await this.openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'developer', content: 'you are guy' },
        { role: 'user', content: 'hello' },
      ],
    });
    return response.choices[0].message.content;
  }
}
