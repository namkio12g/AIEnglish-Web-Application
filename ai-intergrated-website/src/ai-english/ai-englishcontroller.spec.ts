import { Test, TestingModule } from '@nestjs/testing';
import { AIEnglishController } from './ai-english.controller';

describe('OpenAiController', () => {
  let controller: AIEnglishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AIEnglishController],
    }).compile();

    controller = module.get<AIEnglishController>(AIEnglishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
