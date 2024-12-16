import { HttpStatus } from "@nestjs/common";

export class ResponseDTO{
    status: string;
    data: any;

    constructor(
        status: string,
        data: any
    ){
        this.status = status;
        this.data = data;
    }
}