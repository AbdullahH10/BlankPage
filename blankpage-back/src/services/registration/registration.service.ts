import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import *  as bcrypt from 'bcrypt';
import { UserDto } from 'src/dtos/UserDto';

@Injectable()
export class RegistrationService {
    
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async addUser(userDto: UserDto){
        const user: User = new User();
        
        user.userName = userDto.userName;
        user.salt = await bcrypt.genSalt();
        const saltedPassword = userDto.password.concat(user.salt);
        user.password = await bcrypt.hash(saltedPassword,12);

        this.userRepository.save(user);
    }
}
