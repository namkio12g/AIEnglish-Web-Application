import { Module } from "@nestjs/common";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { RabbitMqWorkerService } from "./rabbitMqWorker.service";

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [{ name: 'sss', type: 'direct' }],
      uri: 'amqp://guest:guest@127.0.0.1:5672',
      connectionInitOptions: { wait: true },
    }),
  ],
  providers: [RabbitMqWorkerService],
})
export class RabbitMqWorkerModule {}