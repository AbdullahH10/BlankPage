import { User } from './Entities/user.entity';
import { MongoRepository, ObjectID, Repository } from 'typeorm';
export declare class AppService {
    private readonly repository;
    private readonly mongoRepository;
    constructor(repository: Repository<User>, mongoRepository: MongoRepository<User>);
    setUser(user: User): Promise<any>;
    getUser(user: User): Promise<any>;
    getMessages(user: User): Promise<any>;
    sendMessage(id: ObjectID, userData: User): Promise<any>;
    getAll(): Promise<any>;
}
