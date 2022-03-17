import { User } from './Entities/user.entity';
import { Injectable } from '@nestjs/common';
import { MongoRepository, ObjectID, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {

    constructor(@InjectRepository(User) private readonly repository: Repository<User>, @InjectRepository(User) private readonly mongoRepository: MongoRepository<User>) {}

    async setUser(user: User): Promise<any> {

        if(await this.repository.findOne({email: `${user.email}`}) === undefined) {
            this.repository.save(user);
            return true;
        }

        else {
            return false;
        }
    }

    async getUser(user: User): Promise<any> {
        return this.repository.findOne({where: { email: { $eq: user.email}}});
    }

    async getMessages(user: User): Promise<any> {
        return await this.repository.findOne({where: { email: { $eq: user.email }}});
    }

    async sendMessage(id: ObjectID, userData: User): Promise<any> {
        let storeUserObject = this.mongoRepository.findOne(id);
        return await this.mongoRepository.updateOne({email: (await storeUserObject).email},{$push:{messages: userData.messages[0]}});
        //return await this.repository.update(id, {messages: userData.messages});
    }

    async getAll(): Promise<any> {
        return this.repository.find();
    }
}
