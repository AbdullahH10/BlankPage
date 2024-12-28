import { User } from './Entity/user.entity';
import { MongoRepository } from 'typeorm';
import { UserDTO } from './DTO/user.dto';
import { Token } from './DTO/token.dto';
import { MessageDTO } from './DTO/message.dto';
import { Message } from './Model/message.model';
import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private readonly repository;
    private configService;
    constructor(repository: MongoRepository<User>, configService: ConfigService);
    tokenLifetimeMS: string;
    createUser(user: UserDTO): Promise<boolean>;
    authenticateUser(user: UserDTO): Promise<boolean>;
    getToken(user: UserDTO): Promise<Token>;
    addMessage(userId: string, messageDTO: MessageDTO): Promise<boolean>;
    getMessages(token: Token): Promise<Message[]>;
}
