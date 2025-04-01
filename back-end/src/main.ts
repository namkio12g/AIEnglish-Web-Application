import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AIEnglishExceptionFilter } from './exceptionFilter/global.exceptionFilter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   origin:'http://localhost:3100',
  //   methods:"GET,HEAD,PUT,DELETE,PATCH,PUT",
  //   credentials:true
  // }
  // );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, 
      forbidNonWhitelisted: true, 
    }),
  );
  app.useGlobalFilters(new AIEnglishExceptionFilter())
  const configService=app.get(ConfigService);
  await app.listen(configService.get<number>('PORT') ?? 3000);
}
bootstrap();
