import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EssayService } from './essay.service';
import { JwtAuthGuard } from 'src/guards/JwtAuth.guard';
import { EvaluatingResultDTO } from './dto/evaluatingResult.dto';

@UseGuards(JwtAuthGuard)
@Controller('essay')
export class EssayController {
  constructor(private readonly essayService: EssayService) {}
  @Post('refine')
  evaluateSite(@Body('essay') essay: string) {
    const result = this.essayService.refineEssay(essay);
    return result;
  }

  @Post('save-result')
  saveEvaluatingResult(
    @Body() evaluatingResultDTO: EvaluatingResultDTO,
    @Request() req,
  ) {
    const user = req.user;
    return this.essayService.saveEvaluatingResult(evaluatingResultDTO, user.id);
  }

  @Post('evaluate')
  evaluateEssay(@Body('topic') topic: string, @Body('essay') essay: string) {
    const result = this.essayService.evaluateEssay(topic, essay);
    return result;
  }
}
