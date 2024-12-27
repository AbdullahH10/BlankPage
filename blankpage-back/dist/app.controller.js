"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const user_dto_1 = require("./DTO/user.dto");
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const response_dto_1 = require("./DTO/response.dto");
const token_dto_1 = require("./DTO/token.dto");
const message_dto_1 = require("./DTO/message.dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async createUser(user) {
        const isUserCreated = await this.appService.createUser(user);
        if (isUserCreated) {
            return new response_dto_1.ResponseDTO('User created successfully', null);
        }
        else {
            return new response_dto_1.ResponseDTO('Could not create user. Please try again with a different user name.', null);
        }
    }
    async loginUser(user) {
        const isAuthenticated = await this.appService.authenticateUser(user);
        if (isAuthenticated) {
            const token = await this.appService.getToken(user);
            if (token !== null) {
                return new response_dto_1.ResponseDTO('User logged in successfully.', token);
            }
            else {
                return new response_dto_1.ResponseDTO('User authenticated but could not generate token.', token);
            }
        }
        else {
            return new response_dto_1.ResponseDTO('Login failed. Incorrect user name or password.', null);
        }
    }
    async postMessage(userId, message) {
        const isPosted = await this.appService.addMessage(userId, message);
        if (isPosted) {
            return new response_dto_1.ResponseDTO('Message sent.', null);
        }
        return new response_dto_1.ResponseDTO('Failed to send message. Please try again.', null);
    }
    async getMessages(userId, token) {
        const tokenObj = new token_dto_1.Token();
        tokenObj.userId = userId;
        tokenObj.token = token;
        if (token === undefined) {
            return new response_dto_1.ResponseDTO('Authentication failure. Token is required.', null);
        }
        const messages = await this.appService.getMessages(tokenObj);
        if (messages !== null && messages !== undefined) {
            return new response_dto_1.ResponseDTO(messages.length + ' messages found.', messages);
        }
        else if (messages === undefined) {
            return new response_dto_1.ResponseDTO('No message found', null);
        }
        return new response_dto_1.ResponseDTO('Failed to get all messages. Token invalid or database not responding.', null);
    }
};
__decorate([
    (0, common_1.Post)('/user/create'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/user/login'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Post)('/message/post/:userId'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, message_dto_1.MessageDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "postMessage", null);
__decorate([
    (0, common_1.Get)('/message/get/:userId'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Headers)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getMessages", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map