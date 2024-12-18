import { User } from './Entity/user.entity';
import { MongoRepository } from 'typeorm';
import { UserDTO } from './DTO/user.dto';
export declare class AppService {
    private readonly repository;
    constructor(repository: MongoRepository<User>);
    createUser(user: UserDTO): Promise<boolean>;
}
