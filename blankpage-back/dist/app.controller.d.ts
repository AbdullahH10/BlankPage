import { UserDTO } from './DTO/user.dto';
import { AppService } from './app.service';
import { ResponseDTO } from './DTO/response.dto';
import { MessageDTO } from './DTO/message.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    createUser(user: UserDTO): Promise<ResponseDTO>;
    loginUser(user: UserDTO): Promise<ResponseDTO>;
    postMessage(userId: string, message: MessageDTO): Promise<ResponseDTO>;
    getMessages(userId: string, token: string): Promise<ResponseDTO>;
}
