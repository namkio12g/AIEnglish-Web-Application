import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WordsModule } from './words/words.module';
import { AuthModule } from './auth/auth.module';
import { EssayModule } from './essay/essay.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TopicModule } from './topic/topic.module';
import mainConfig from 'config/mainConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/JwtAuth.guard';
import { GoogleStrategy } from './auth/google.strategy';
import { APP_GUARD } from '@nestjs/core';
import { User } from './users/entities/user.entity';
import { Word } from './words/entities/word.entity';
import { WordsList } from './words/entities/wordsList.entity';
import { EvaluatingHistory } from './essay/entities/evaluatingHistory.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [mainConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database_host'),
        port: configService.get<number>('database_port'),
        username: configService.get<string>('database_username'),
        password: configService.get<string>('database_password'),
        database: configService.get<string>('database_name'),
        entities: [join(__dirname, '**/*.entity{.ts,.js}')],
        synchronize: true,
      }),
    }),
    UsersModule,
    WordsModule,
    AuthModule,
    EssayModule,
    TopicModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
