import { Time } from "@angular/common";

export class Message {
    constructor (
        public time: number,
        public date: number,
        public messageBody: string
    ) {}
}