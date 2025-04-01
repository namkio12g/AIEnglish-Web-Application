import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions,Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
      transport:Transport.GRPC,
      options:{
        package:"AIEnglish",
        protoPath:"proto/AI_English.proto",
        url:"localhost:50051"
      }
  });


  await app.listen();
  console.log("grpc are now listening")
}
bootstrap();
