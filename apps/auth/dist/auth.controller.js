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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const auth_service_1 = require("./auth.service");
const auth_request_1 = require("./auth.request");
const user_dto_1 = require("./user.dto");
const constants_1 = require("./constants");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('login', user);
            const access_token = yield this.authService.login(user.email, user.phoneNumber, user.password);
            if (!access_token) {
                return {
                    success: false,
                    message: 'Login failed',
                    data: {},
                };
            }
            return {
                success: true,
                message: 'Login successfully',
                data: Object.assign({}, access_token),
            };
        });
    }
    verifyToken(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = yield this.authService.loginGgWithToken(body.token);
                return {
                    success: true,
                    message: 'Token is valid',
                    data: decoded,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Token is invalid',
                    error: error.message,
                };
            }
        });
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.register(user);
            return result;
        });
    }
    createAccessToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const access_token = yield this.authService.createAccessToken(user);
            return {
                success: true,
                message: 'Access token created successfully',
                data: {
                    access_token,
                },
            };
        });
    }
    verifyAccessToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const isVerified = yield this.authService.verifyAccessToken(token);
            return {
                success: isVerified,
                message: isVerified ? 'Access token is valid' : 'Access token is invalid',
            };
        });
    }
    createRefreshToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refresh_token = yield this.authService.createRefreshToken(user === null || user === void 0 ? void 0 : user.userId, constants_1.jwtConstants.JWT_EXPIRES_IN_REFRESH_TOKEN);
                return {
                    success: true,
                    message: 'Refresh token created successfully',
                    data: {
                        refresh_token,
                    },
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error creating refresh token',
                    error: error.message,
                };
            }
        });
    }
    validTokenSignUp(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.validTokenSignUp(payload.token);
            return result;
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'login' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_request_1.LoginRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'loginGgwithToken' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'register' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'createAccessToken' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createAccessToken", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'verifyAccessToken' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyAccessToken", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'createRefreshToken' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createRefreshToken", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'validTokenSignUp' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validTokenSignUp", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map