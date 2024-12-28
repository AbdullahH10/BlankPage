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
exports.AppService = void 0;
const user_entity_1 = require("./Entity/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const console_1 = require("console");
const uuid_1 = require("uuid");
const argon2_1 = require("argon2");
const token_dto_1 = require("./DTO/token.dto");
const message_model_1 = require("./Model/message.model");
let AppService = class AppService {
    constructor(repository) {
        this.repository = repository;
        this.tokenLifetimeMS = 30 * 60 * 1000;
    }
    async createUser(user) {
        const passwordHash = await (0, argon2_1.hash)(user.password);
        return await this.repository.findOne({
            userName: user.userName
        }).then((searchUser) => {
            if (searchUser !== undefined && searchUser.userName === user.userName) {
                (0, console_1.log)('User already exists.');
                return false;
            }
            else {
                const userEntity = new user_entity_1.User();
                userEntity.userName = user.userName;
                userEntity.password = passwordHash;
                this.repository.save(userEntity);
                return true;
            }
        }).catch((error) => {
            (0, console_1.log)(error);
            return false;
        });
    }
    async authenticateUser(user) {
        const authUser = await this.repository.findOne({
            "userName": user.userName
        });
        if (authUser !== null && authUser !== undefined) {
            return (0, argon2_1.verify)(authUser.password, user.password);
        }
        return false;
    }
    async getToken(user) {
        const token = (0, uuid_1.v4)();
        const tokenExpiration = new Date(Date.now() + this.tokenLifetimeMS);
        const result = await this.repository.findOneAndUpdate({
            "userName": user.userName
        }, {
            $set: {
                "token": token,
                "tokenExpiration": tokenExpiration
            }
        });
        if (result.ok === 1) {
            const tokenObj = new token_dto_1.Token();
            tokenObj.userId = result.value.userId;
            tokenObj.token = token;
            return tokenObj;
        }
        return null;
    }
    async addMessage(userId, messageDTO) {
        const message = new message_model_1.Message();
        message.timestamp = new Date();
        message.message = messageDTO.message;
        const result = await this.repository.findOneAndUpdate({
            "userId": userId
        }, {
            $push: {
                "messages": message
            }
        });
        if (result.ok === 1 && result.value !== null) {
            return true;
        }
        return false;
    }
    async getMessages(token) {
        const user = await this.repository.findOne({
            "userId": token.userId,
            "token": token.token
        });
        if (user !== null && user !== undefined &&
            user.tokenExpiration.getTime() > Date.now()) {
            return user.messages;
        }
        return null;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.MongoRepository])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map