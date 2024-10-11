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
        bcrypt.genSalt().then(
            (salt) => {
                user.salt = salt;
                userDto.password.concat(salt);
            },
            (error) => {
                console.log(error);
            }
        );
        bcrypt.hash(userDto.password,12).then(
            (encoded) => {
                user.password = encoded;
            },
            (error) => {
                console.log(error);
            }
        );

        this.userRepository.save(user);
    }
}
