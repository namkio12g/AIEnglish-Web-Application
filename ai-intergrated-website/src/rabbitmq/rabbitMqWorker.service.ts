import { Injectable } from "@nestjs/common";
import { AmqpConnection,RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
@Injectable()
export class RabbitMqWorkerService{
    constructor(private amqpConnection : AmqpConnection){}
    // publish message to rabbitmq
    async sendMessgae(message:any){
        await this.amqpConnection.publish("exchange","routingkey",message)
        console.log("sent message",message)
    }
    @RabbitSubscribe({
        exchange:"exchange",
        routingKey:"AI_BE_key",
        queue:"queue"
    })
    async handleMessage(msg:any){
        console.log("receive message",msg)
    }


}