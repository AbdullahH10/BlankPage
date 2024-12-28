import { User } from './Entity/user.entity';
import { MongoRepository } from 'typeorm';
import { UserDTO } from './DTO/user.dto';
import { Token } from './DTO/token.dto';
import { MessageDTO } from './DTO/message.dto';
import { Message } from './Model/message.model';
export declare class AppService {
    private readonly repository;
    tokenLifetimeMS: number;
    constructor(repository: MongoRepository<User>);
    createUser(user: UserDTO): Promise<boolean>;
    authenticateUser(user: UserDTO): Promise<boolean>;
    getToken(user: UserDTO): Promise<Token>;
    addMessage(userId: string, messageDTO: MessageDTO): Promise<boolean>;
    getMessages(token: Token): Promise<Message[]>;
}
