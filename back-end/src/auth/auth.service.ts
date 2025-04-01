import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService,@InjectRepository(User) private userRepository : Repository<User> ){}

    async login(user:any){
        let payload;
        try {
            const userExistence = await this.userRepository.findOne({where:{email:user.email}})
            if(!userExistence){
                const newUser = new User(user);
                const savedUser = await this.userRepository.save(newUser)
                payload = { email: user.email, id: savedUser.id };
            }
            else{
                payload = { email: user.email, id: userExistence.id };
    
            }
        } catch (error) {
            console.log("the error: ",error);
            throw new InternalServerErrorException("error logging user")
        }
        const token = await this.jwtService.sign(payload);
        return token;
        
    }


}
