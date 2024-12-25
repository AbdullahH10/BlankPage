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
let AppService = class AppService {
    constructor(repository) {
        this.repository = repository;
    }
    async createUser(user) {
        return await this.repository.findOne({
            userName: user.userName
        }).then((searchUser) => {
            if (searchUser !== undefined && searchUser.userName === user.userName) {
                (0, console_1.log)('User already exists.');
                return false;
            }
            else {
                const userEntity = this.repository.create(user);
                this.repository.save(userEntity);
                return true;
            }
        }).catch((error) => {
            (0, console_1.log)(error);
            return false;
        });
    }
    async authenticateUser(user) {
        return this.repository.findOne({
            "userName": user.userName,
            "password": user.password
        }).then((result) => {
            if (result !== undefined && result !== null) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    async getToken(user) {
        const token = (0, uuid_1.v4)();
        const result = await this.repository.findOneAndUpdate({
            "userName": user.userName,
            "password": user.password
        }, {
            $set: {
                "token": token
            }
        });
        if (result.ok === 1) {
            return token;
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