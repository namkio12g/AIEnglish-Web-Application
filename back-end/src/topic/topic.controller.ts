import { Body, Controller,Post } from '@nestjs/common';
import { TopicService } from './topic.service';
@Controller('topic')
export class TopicController {
    constructor(private topicService : TopicService){}

    @Post("generate")
    generateTopic(){
        return this.generateTopic()
    }

    @Post("brainstorm")
    brainstormTopic(@Body("topic") topic:string){
        return this.brainstormTopic(topic);
    }

}
