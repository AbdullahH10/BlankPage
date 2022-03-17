import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getAll(): Promise<any>;
    setUser(userData: any): Promise<any>;
    getUser(userData: any): Promise<any>;
    getMessages(userData: any): Promise<any>;
    sendMessage(params: any, userData: any): Promise<void>;
}
