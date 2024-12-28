import { User } from './Entity/user.entity';
import { FindAndModifyWriteOpResultObject, MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './DTO/user.dto';
import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { v4 } from 'uuid';
import { hash, verify } from 'argon2';
import { Token } from './DTO/token.dto';
import { MessageDTO } from './DTO/message.dto';
import { Message } from './Model/message.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(User)
        private readonly repository: MongoRepository<User>,
        private configService: ConfigService
    ) { }

    tokenLifetimeMS: string = this.configService.get<string>('TOKEN_TTL_MS');

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
        if (authUser !== null && authUser !== undefined) {
            return verify(authUser.password, user.password);
        }
        return false;
    }

    async getToken(user: UserDTO): Promise<Token> {
        const token: string = v4();
        const tokenExpiration: Date = new Date(Date.now() + parseInt(this.tokenLifetimeMS));
        const result: FindAndModifyWriteOpResultObject = await this.repository.findOneAndUpdate(
            {
                "userName": user.userName
            },
            {
                $set: {
                    "token": token,
                    "tokenExpiration": tokenExpiration
                }
            }
        );

        if (result.ok === 1) {
            const tokenObj: Token = new Token();
            tokenObj.userId = result.value.userId;
            tokenObj.token = token;
            return tokenObj;
        }
        return null;
    }

    async addMessage(userId: string, messageDTO: MessageDTO): Promise<boolean> {
        const message: Message = new Message();
        message.timestamp = new Date();
        message.message = messageDTO.message;
        const result: FindAndModifyWriteOpResultObject = await this.repository.findOneAndUpdate(
            {
                "userId": userId
            },
            {
                $push: {
                    "messages": message
                }
            }
        );

        if (result.ok === 1 && result.value !== null) {
            return true;
        }
        return false;
    }

    async getMessages(token: Token): Promise<Message[]> {
        const user: User = await this.repository.findOne({
            "userId": token.userId,
            "token": token.token
        });
        if (user !== null && user !== undefined &&
            user.tokenExpiration.getTime() > Date.now()) {
            return user.messages;
        }
        return null;
    }
}
