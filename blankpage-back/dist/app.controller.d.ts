import { UserDTO } from './DTO/user.dto';
import { AppService } from './app.service';
import { ResponseDTO } from './DTO/response.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    createUser(user: UserDTO): Promise<ResponseDTO>;
    loginUser(user: UserDTO): Promise<ResponseDTO>;
}
