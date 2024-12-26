import { User } from './Entity/user.entity';
import { MongoRepository } from 'typeorm';
import { UserDTO } from './DTO/user.dto';
import { Token } from './DTO/token.dto';
export declare class AppService {
    private readonly repository;
    constructor(repository: MongoRepository<User>);
    createUser(user: UserDTO): Promise<boolean>;
    authenticateUser(user: UserDTO): Promise<boolean>;
    getToken(user: UserDTO): Promise<Token>;
}
