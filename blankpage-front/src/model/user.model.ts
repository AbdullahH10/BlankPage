import { Message } from './message.model';
export class User {
    constructor(
        public id?: string,
        public email?: string,
        public password?: string,
        public messages?: Message[]
    ) {}
}