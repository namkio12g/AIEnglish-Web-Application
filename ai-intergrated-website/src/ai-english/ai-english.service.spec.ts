import { Test, TestingModule } from '@nestjs/testing';
import { AIEnglishService } from './ai-english.service';

describe('OpenAiService', () => {
  let service: AIEnglishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AIEnglishService],
    }).compile();

    service = module.get<AIEnglishService>(AIEnglishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
