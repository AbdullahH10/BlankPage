import { User } from './Entity/user.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './DTO/user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { error, log } from 'console';

@Injectable()
export class AppService {

    constructor(
        @InjectRepository(User)
        private readonly repository: MongoRepository<User>
    ) { }

    async createUser(user: UserDTO){
        return await this.repository.findOne({
            userName: user.userName
        }).then(
            (searchUser) => {
                if (searchUser !== undefined && searchUser.userName === user.userName) {
                    log('User already exists.');
                    return false;
                }
                else {
                    const userEntity = this.repository.create(user);
                    this.repository.save(userEntity);
                    return true;
                }
            }
        ).catch(
            (error) => {
                log(error);
                return false;
            }
        );
    }
}
