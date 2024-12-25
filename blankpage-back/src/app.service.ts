import { User } from './Entity/user.entity';
import { FindAndModifyWriteOpResultObject, MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './DTO/user.dto';
import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { v4 } from 'uuid';
import { hash, verify } from 'argon2';

@Injectable()
export class AppService {

    constructor(
        @InjectRepository(User)
        private readonly repository: MongoRepository<User>
    ) { }

    async createUser(user: UserDTO): Promise<boolean> {
        const passwordHash: string = await hash(user.password);
        return await this.repository.findOne({
            userName: user.userName
        }).then(
            (searchUser) => {
                if (searchUser !== undefined && searchUser.userName === user.userName) {
                    log('User already exists.');
                    return false;
                }
                else {
                    const userEntity: User = new User();
                    userEntity.userName = user.userName;
                    userEntity.password = passwordHash;
                    userEntity.token = v4();
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

    async authenticateUser(user: UserDTO): Promise<boolean> {
        const authUser: User = await this.repository.findOne({
            "userName": user.userName
        });
        if(authUser !== null && authUser !== undefined){
            return verify(authUser.password,user.password);
        }
        return false;
    }

    async getToken(user: UserDTO): Promise<string> {
        const token: string = v4();
        const result: FindAndModifyWriteOpResultObject = await this.repository.findOneAndUpdate(
            {
                "userName": user.userName,
                "password": user.password
            },
            {
                $set: {
                    "token": token
                }
            }
        );

        if (result.ok === 1) {
            return token;
        }
        return null;
    }
}
