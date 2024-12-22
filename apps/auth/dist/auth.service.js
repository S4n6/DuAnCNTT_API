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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const token_schema_1 = require("./token.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const constants_1 = require("./constants");
let AuthService = class AuthService {
    constructor(jwtService, client, tokenModel) {
        this.jwtService = jwtService;
        this.client = client;
        this.tokenModel = tokenModel;
    }
    onModuleInit() {
        this.userService = this.client.getService('UserService');
    }
    login(email, phoneNumber, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { email, phoneNumber, password };
            const user = yield this.validateUser(email, phoneNumber, password);
            const access_token = yield this.jwtService.sign(payload);
            if (!user.success) {
                return null;
            }
            return {
                access_token,
            };
        });
    }
    validateUser(email, phoneNumber, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (email) {
                const user = yield this.userService
                    .validateUserByEmail({ email, password })
                    .toPromise();
                return user;
            }
            if (phoneNumber) {
                const user = yield this.userService
                    .validateUserByPhoneNumber({ phoneNumber, password })
                    .toPromise();
                return user;
            }
        });
    }
    createAccessToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jwtService.sign(user, {
                expiresIn: constants_1.jwtConstants.JWT_EXPIRES_IN_ACCESS_TOKEN,
            });
        });
    }
    verifyAccessToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.jwtService.verify(token, { ignoreExpiration: false });
                return { success: true, message: 'Access token is valid' };
            }
            catch (error) {
                return { success: false, message: 'Access token is invalid' };
            }
        });
    }
    createRefreshToken(userId, expiresIn) {
        return __awaiter(this, void 0, void 0, function* () {
            const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            const refreshToken = this.jwtService.sign({ userId }, { expiresIn });
            const salt = yield bcrypt.genSalt(10);
            const hashedRefreshToken = yield bcrypt.hash(refreshToken + constants_1.jwtConstants.JWT_REFRESH_TOKEN_HASH_SECRET, salt);
            const token = new this.tokenModel({
                userId,
                refreshToken: hashedRefreshToken,
                expiresAt,
            });
            return token.save();
        });
    }
    findRefreshToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokenModel.findOne({ _id: userId }).exec();
        });
    }
    deleteRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tokenModel.deleteOne({ refreshToken }).exec();
        });
    }
    validateRefreshToken(refreshToken, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.findRefreshToken(userId);
            if (!token) {
                return { success: false, message: 'Refresh token not found' };
            }
            const isMatch = yield bcrypt.compare(refreshToken + constants_1.jwtConstants.JWT_REFRESH_TOKEN_HASH_SECRET, token.refreshToken);
            if (!isMatch) {
                return { success: false, message: 'Refresh token is invalid' };
            }
            try {
                this.jwtService.verify(refreshToken);
                return { success: true, message: 'Refresh token is valid' };
            }
            catch (error) {
                return { success: false, message: 'Refresh token is invalid' };
            }
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('USER_PACKAGE')),
    __param(2, (0, mongoose_1.InjectModel)(token_schema_1.Token.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService, Object, mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map