"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const bcrypt = __importStar(require("bcryptjs"));
const constants_1 = require("./constants");
const axios_1 = require("@nestjs/axios");
const auth_response_1 = require("./auth.response");
const crypto_util_1 = require("./crypto.util");
const rxjs_1 = require("rxjs");
let AuthService = class AuthService {
    constructor(jwtService, client, tokenModel, httpService) {
        this.jwtService = jwtService;
        this.client = client;
        this.tokenModel = tokenModel;
        this.httpService = httpService;
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
                user: user.data,
                access_token,
            };
        });
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('register...', user);
                const isUserExist = yield this.httpService
                    .get('http://localhost:3001/api/users/email/' + user.email)
                    .toPromise();
                if (!isUserExist.data.success) {
                    const hashedPassword = (0, crypto_util_1.encrypt)(user.password);
                    user.password = hashedPassword;
                    const verificationToken = this.jwtService.sign({ user }, { expiresIn: '1h' });
                    const templateEmail = {
                        to: user.email,
                        subject: 'Tạo tài khoản',
                        text: 'Để đăng kí tài khoản mời bạn nhấn vào link sau đây http://localhost:3000/api/auth/validTokenSignUp/' +
                            verificationToken,
                    };
                    const sendMail = yield this.httpService
                        .post('http://localhost:3007/api/email/notify', {
                        email: templateEmail,
                    })
                        .toPromise();
                    console.log('sendMail', sendMail.data);
                    if (sendMail.data.success) {
                        return new auth_response_1.AuthResponseDto(true, 'Email sent', {});
                    }
                    else {
                        return new auth_response_1.AuthResponseDto(false, 'Error sending email', {});
                    }
                }
                else {
                    return new auth_response_1.AuthResponseDto(false, 'User already exists', {});
                }
            }
            catch (error) {
                console.log('error', error);
                return new auth_response_1.AuthResponseDto(false, 'Error creating user', {});
            }
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
    validateOAuthLogin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const payload = {
                email: (_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.email,
                fullName: ((_b = user === null || user === void 0 ? void 0 : user.user) === null || _b === void 0 ? void 0 : _b.firstName) + ' ' + ((_c = user === null || user === void 0 ? void 0 : user.user) === null || _c === void 0 ? void 0 : _c.lastName),
                avatar: (_d = user === null || user === void 0 ? void 0 : user.user) === null || _d === void 0 ? void 0 : _d.picture,
                role: 'student',
            };
            return this.jwtService.sign(payload);
        });
    }
    validTokenSignUp(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('before', token);
                const decoded = this.jwtService.verify(token);
                console.log('decoded', decoded);
                if (decoded) {
                    const user = decoded.user;
                    user.password = (0, crypto_util_1.decrypt)(user.password);
                    const response = yield (0, rxjs_1.lastValueFrom)(this.httpService.post('http://localhost:3001/api/users/', user));
                    const userCreated = response.data;
                    if (userCreated.success) {
                        return new auth_response_1.AuthResponseDto(true, 'User created successfully', {});
                    }
                    else {
                        return new auth_response_1.AuthResponseDto(false, userCreated.message, {});
                    }
                }
                return new auth_response_1.AuthResponseDto(true, 'Token is valid', {});
            }
            catch (error) {
                if (error.name === 'TokenExpiredError') {
                    return new auth_response_1.AuthResponseDto(false, 'Token is expired', {});
                }
                return new auth_response_1.AuthResponseDto(false, 'Token is invalid', {});
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
            try {
                const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                const refreshToken = this.jwtService.sign({ userId }, { expiresIn });
                const salt = yield bcrypt.genSalt(10);
                const hashedRefreshToken = yield bcrypt.hash(refreshToken + constants_1.jwtConstants.JWT_REFRESH_TOKEN_HASH_SECRET, salt);
                const token = new this.tokenModel({
                    userId,
                    refreshToken: hashedRefreshToken,
                    expiresAt,
                });
                return yield token.save();
            }
            catch (error) {
                throw new Error('Error creating refresh token: ' + error.message);
            }
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
    __metadata("design:paramtypes", [jwt_1.JwtService, Object, mongoose_2.Model,
        axios_1.HttpService])
], AuthService);
//# sourceMappingURL=auth.service.js.map