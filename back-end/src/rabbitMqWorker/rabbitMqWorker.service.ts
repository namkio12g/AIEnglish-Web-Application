import { Injectable } from "@nestjs/common";
import { AmqpConnection,RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
@Injectable()
export class RabbitMqWorkerService{
    constructor(private amqpConnection : AmqpConnection){}
    //
    async sendMessage(msg:any){
        await this.amqpConnection.publish("sss","routingkey",msg)
        console.log("sent message at ai")
    }

    @RabbitSubscribe({
        exchange:"sss",
        routingKey:"aa",
        queue:"aaa"
    })
    async handleMessage(msg:any){
        console.log(msg)
    }
}