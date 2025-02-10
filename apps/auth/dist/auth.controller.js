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
const auth_service_1 = require("./auth.service");
const auth_request_1 = require("./auth.request");
const user_dto_1 = require("./user.dto");
const constants_1 = require("./constants");
const passport_1 = require("@nestjs/passport");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(res, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const access_token = yield this.authService.login(user.email, user.phoneNumber, user.password);
            if (!access_token) {
                return res.status(400).json({
                    success: false,
                    message: 'Login failed',
                    data: {},
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Login successfully',
                data: Object.assign({}, access_token),
            });
        });
    }
    googleAuth(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('googleAuth...', req);
        });
    }
    googleAuthRedirect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const access_token = yield this.authService.validateOAuthLogin(user);
            return res.status(200).json({
                success: true,
                message: 'Login successfully',
                data: {
                    access_token,
                },
            });
        });
    }
    verifyToken(res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('body...', body);
                const decoded = yield this.authService.loginGgWithToken(body.token);
                return res.status(200).json({
                    success: true,
                    message: 'Token is valid',
                    data: decoded,
                });
            }
            catch (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Token is invalid',
                    error: error.message,
                });
            }
        });
    }
    register(res, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.register(user);
            return res.status(result.success ? 200 : 400).json(result);
        });
    }
    createAccessToken(res, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const access_token = yield this.authService.createAccessToken(user);
            return res.status(200).json({
                success: true,
                message: 'Access token created successfully',
                data: {
                    access_token,
                },
            });
        });
    }
    verifyAccessToken(res, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const isVerified = yield this.authService.verifyAccessToken(token);
            return res.status(200).json({
                success: isVerified,
                message: isVerified ? 'Access token is valid' : 'Access token is invalid',
            });
        });
    }
    createRefreshToken(res, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refresh_token = yield this.authService.createRefreshToken(user === null || user === void 0 ? void 0 : user.userId, constants_1.jwtConstants.JWT_EXPIRES_IN_REFRESH_TOKEN);
                return res.status(200).json({
                    success: true,
                    message: 'Refresh token created successfully',
                    data: {
                        refresh_token,
                    },
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Error creating refresh token',
                    error: error.message,
                });
            }
        });
    }
    validTokenSignUp(res, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.validTokenSignUp(payload.token);
            return res.status(result.success ? 200 : 400).json(result);
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_request_1.LoginRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Post)('loginGgwithToken'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('createAccessToken'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createAccessToken", null);
__decorate([
    (0, common_1.Get)('verifyAccessToken/:token'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyAccessToken", null);
__decorate([
    (0, common_1.Post)('createRefreshToken'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createRefreshToken", null);
__decorate([
    (0, common_1.Get)('validTokenSignUp/:token'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validTokenSignUp", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('/api/auth/'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map