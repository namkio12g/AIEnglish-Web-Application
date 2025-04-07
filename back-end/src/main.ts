import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AIEnglishExceptionFilter } from './exceptionFilter/global.exceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:'http://localhost:3100',
    methods:"GET,HEAD,PUT,DELETE,PATCH,PUT",
    credentials:true
  }
  );
  app.use(cookieParser());
  app.useGlobalFilters(new AIEnglishExceptionFilter())
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
  const configService=app.get(ConfigService);
  await app.listen(configService.get<number>('PORT') ?? 3000);
}
bootstrap();
