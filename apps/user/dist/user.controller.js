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
const grpc_js_1 = require("@grpc/grpc-js");
const user_dto_1 = require("./user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAllUsers() {
        return this.userService.getAllUsers();
    }
    searchUsers(name, email, isActive, page, limit) {
        return this.userService.searchUsers(name, email, isActive, page, limit);
    }
    getTokenDevicesByUserId(userId) {
        return this.userService.getTokenDevicesByUserId(userId);
    }
    getUserByName(name) {
        return this.userService.getUserByName(name);
    }
    getUserByEmail(payload) {
        console.log('get user by email:', payload);
        return this.userService.getUserByEmail(payload.email);
    }
    getUserByPhoneNumber(phoneNumber) {
        return this.userService.getUserByPhoneNumber(phoneNumber);
    }
    getUserById(id, token) {
        return this.userService.getUserById(id);
    }
    createUserByEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('create user by email:', user);
            const userCreated = yield this.userService.createUserByEmail(user);
            return userCreated;
        });
    }
    createTokenDevice(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCreated = yield this.userService.createTokenDevice(payload.userId, payload.tokenDevice);
            return userCreated;
        });
    }
    updateUser(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUpdated = yield this.userService.updateUser(user, id);
            return userUpdated;
        });
    }
    deleteUser(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDeleted = yield this.userService.deleteUser(id);
            return userDeleted;
        });
    }
    validateUserByEmail(data, metadata, call) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = { username: data.email, password: data.password };
            return this.userService.validateUserByEmail(user);
        });
    }
    validateUserByPhoneNumber(data, metadata, call) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = { username: data.phoneNumber, password: data.password };
            return this.userService.validateUserByPhoneNumber(user);
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('email')),
    __param(2, (0, common_1.Query)('isActive')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean, Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchUsers", null);
__decorate([
    (0, common_1.Get)('tokenDevice/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getTokenDevicesByUserId", null);
__decorate([
    (0, common_1.Get)('name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByName", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByEmail", null);
__decorate([
    (0, common_1.Get)('phoneNumber'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByPhoneNumber", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserByEmail", null);
__decorate([
    (0, common_1.Post)('tokenDevice'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createTokenDevice", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'ValidateUserByEmail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, grpc_js_1.Metadata, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validateUserByEmail", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'ValidateUserByPhoneNumber'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, grpc_js_1.Metadata, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validateUserByPhoneNumber", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('/api/users/'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map