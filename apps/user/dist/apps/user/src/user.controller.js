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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const microservices_1 = require("@nestjs/microservices");
const user_dto_1 = require("./user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAllUsers() {
        console.log('get all users');
        return this.userService.getAllUsers();
    }
    searchUsers(data) {
        const { name, email, isActive, page, limit } = data;
        return this.userService.searchUsers(name, email, isActive, page, limit);
    }
    getTokenDevicesByUserId(data) {
        return this.userService.getTokenDevicesByUserId(data.userId);
    }
    getUserByName(data) {
        return this.userService.getUserByName(data.name);
    }
    getUserByEmail(data) {
        console.log('get user by email:', data);
        return this.userService.getUserByEmail(data.email);
    }
    getUserByPhoneNumber(data) {
        return this.userService.getUserByPhoneNumber(data.phoneNumber);
    }
    getUserById(data) {
        return this.userService.getUserById(data.id);
    }
    createUserByEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('create user by email:', data);
            const userCreated = yield this.userService.createUserByEmail(data);
            return userCreated;
        });
    }
    createTokenDevice(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCreated = yield this.userService.createTokenDevice(data.userId, data.tokenDevice);
            return userCreated;
        });
    }
    updateUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUpdated = yield this.userService.updateUser(data.user, data.id);
            return userUpdated;
        });
    }
    deleteUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDeleted = yield this.userService.deleteUser(data.id);
            return userDeleted;
        });
    }
    validateUserByEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = { username: data.email, password: data.password };
            return this.userService.validateUserByEmail(user);
        });
    }
    changeRole(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.changeRole(data.id, data.role);
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'getAllUsers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'searchUsers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchUsers", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'getTokenDevicesByUserId' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getTokenDevicesByUserId", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'getUserByName' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByName", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'getUserByEmail' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'getUserByPhoneNumber' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByPhoneNumber", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'getUserById' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'createUserByEmail' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserByEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'createTokenDevice' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createTokenDevice", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'updateUser' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'deleteUser' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'validateUserByEmail' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validateUserByEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'updateUserRole' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeRole", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('/api/users/'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map