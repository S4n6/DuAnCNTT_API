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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const constant_1 = require("./constant");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const mongoose_2 = require("mongoose");
const user_response_1 = require("./user.response");
const bcrypt = __importStar(require("bcryptjs"));
const axios_1 = require("@nestjs/axios");
const tokenDevice_schema_1 = require("./tokenDevice.schema");
let UserService = class UserService {
    constructor(userModel, httpService, tokenDeviceModel) {
        this.userModel = userModel;
        this.httpService = httpService;
        this.tokenDeviceModel = tokenDeviceModel;
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userModel.find();
            if (!users) {
                return new user_response_1.UserResponseDto(false, 'Users not found', null);
            }
            return new user_response_1.UserResponseDto(true, 'Users found', {
                users,
                total: users.length,
            });
        });
    }
    getUserByName(name_1) {
        return __awaiter(this, arguments, void 0, function* (name, page = 1, limit = 10) {
            console.log('name:', name);
            const query = { fullName: { $regex: name, $options: 'i' } };
            const users = yield this.userModel
                .find(query)
                .skip((page - 1) * limit)
                .limit(limit);
            if (!users || users.length === 0) {
                return new user_response_1.UserResponseDto(false, 'User not found');
            }
            const total = yield this.userModel.countDocuments(query);
            return new user_response_1.UserResponseDto(true, 'User found', {
                users,
                total,
                page,
            });
        });
    }
    searchUsers(name_1, email_1, isActive_1) {
        return __awaiter(this, arguments, void 0, function* (name, email, isActive, page = 1, limit = 10) {
            const query = {};
            if (name) {
                query.fullName = { $regex: name, $options: 'i' };
            }
            if (email) {
                query.email = email;
            }
            if (isActive) {
                query.isActive = isActive;
            }
            const users = yield this.userModel
                .find(query)
                .skip((page - 1) * limit)
                .limit(limit);
            if (!users || users.length === 0) {
                return new user_response_1.UserResponseDto(false, 'No users found');
            }
            const total = yield this.userModel.countDocuments(query);
            return new user_response_1.UserResponseDto(true, 'Users found', {
                users,
                total,
                page,
            });
        });
    }
    getTokenDevicesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenDevices = yield this.tokenDeviceModel
                    .find({ user: userId })
                    .exec();
                return new user_response_1.UserResponseDto(true, 'Token devices found', null);
            }
            catch (error) {
                console.error('Error fetching token devices by user ID:', error);
                return new user_response_1.UserResponseDto(false, 'Failed to fetch token devices by user ID');
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(id);
            if (!user) {
                return new user_response_1.UserResponseDto(false, 'User not found');
            }
            return new user_response_1.UserResponseDto(true, 'User found', {
                users: user,
            });
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ email });
            if (!user) {
                return new user_response_1.UserResponseDto(false, 'User not found');
            }
            return new user_response_1.UserResponseDto(true, 'User found', {
                users: user,
            });
        });
    }
    changeRole(id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel.findById(id);
                if (!user) {
                    return new user_response_1.UserResponseDto(false, 'User not found');
                }
                console.log('role:', role);
                if (!Object.values(constant_1.ROLE).includes(role)) {
                    return new user_response_1.UserResponseDto(false, 'Invalid role');
                }
                user.role = role;
                yield user.save();
                return new user_response_1.UserResponseDto(true, 'Role changed successfully', {
                    users: user,
                });
            }
            catch (error) {
                console.error('Error changing role:', error);
                return new user_response_1.UserResponseDto(false, 'Role change failed');
            }
        });
    }
    createUserByPhoneNumber(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkedUser = yield this.getUserByPhoneNumber(user.phoneNumber);
                if (checkedUser.success) {
                    return new user_response_1.UserResponseDto(false, 'User already exists');
                }
                if (!Object.values(constant_1.ROLE).includes(user.role)) {
                    return new user_response_1.UserResponseDto(false, 'Invalid role');
                }
                const secretHashPassword = constant_1.USER_CONSTANTS.SECRET_HASH_PASSWORD;
                const salt = yield bcrypt.genSalt(10);
                user.password = yield bcrypt.hash(user.password + secretHashPassword, salt);
                const createdUser = new this.userModel(user);
                yield createdUser.save();
                return new user_response_1.UserResponseDto(true, 'User created successfully', {
                    users: createdUser,
                });
            }
            catch (error) {
                console.error('Error creating user:', error);
                return new user_response_1.UserResponseDto(false, 'User creation failed');
            }
        });
    }
    createTokenDevice(userId, tokenDeviceData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenDevice = new this.tokenDeviceModel({
                    user: userId,
                    token: tokenDeviceData,
                });
                yield tokenDevice.save();
                return new user_response_1.UserResponseDto(true, 'Token device created successfully');
            }
            catch (error) {
                console.error('Error creating token device:', error);
                return new user_response_1.UserResponseDto(false, 'Token device creation failed');
            }
        });
    }
    updateUser(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.userModel.findById(id);
                if (!existingUser) {
                    return new user_response_1.UserResponseDto(false, 'User not found');
                }
                Object.assign(existingUser, user);
                yield existingUser.save();
                return new user_response_1.UserResponseDto(true, 'User updated successfully', {
                    users: existingUser,
                });
            }
            catch (error) {
                console.error('Error updating user:', error);
                return new user_response_1.UserResponseDto(false, 'User update failed');
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.userModel.findById(id);
                if (!existingUser) {
                    return new user_response_1.UserResponseDto(false, 'User not found');
                }
                yield existingUser.deleteOne();
                return new user_response_1.UserResponseDto(true, 'User deleted successfully');
            }
            catch (error) {
                console.error('Error deleting user:', error);
                return new user_response_1.UserResponseDto(false, 'User deletion failed');
            }
        });
    }
    getUserByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ phoneNumber });
            if (!user) {
                return new user_response_1.UserResponseDto(false, 'User not found');
            }
            return new user_response_1.UserResponseDto(true, 'User found', {
                users: user,
            });
        });
    }
    createUserByEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkedUser = yield this.getUserByEmail(user.email);
                if (checkedUser.success) {
                    return new user_response_1.UserResponseDto(false, 'User already exists');
                }
                if (!Object.values(constant_1.ROLE).includes(user.role)) {
                    return new user_response_1.UserResponseDto(false, 'Invalid role');
                }
                const secretHashPassword = constant_1.USER_CONSTANTS.SECRET_HASH_PASSWORD;
                const salt = yield bcrypt.genSalt(10);
                user.password = yield bcrypt.hash(user.password + secretHashPassword, salt);
                const createdUser = new this.userModel(user);
                yield createdUser.save();
                return new user_response_1.UserResponseDto(true, 'User created successfully', {
                    users: createdUser,
                });
            }
            catch (error) {
                console.error('Error creating user:', error);
                return new user_response_1.UserResponseDto(false, (error === null || error === void 0 ? void 0 : error.message) || 'User creation failed');
            }
        });
    }
    validateUserByEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const secretHashPassword = constant_1.USER_CONSTANTS.SECRET_HASH_PASSWORD;
            const user = yield this.getUserByEmail(data.username);
            if (!(user === null || user === void 0 ? void 0 : user.success)) {
                return new user_response_1.UserResponseDto(false, 'User not found');
            }
            const userData = (_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a.users;
            const isPasswordValid = yield bcrypt.compare(data.password + secretHashPassword, userData.password);
            if (!isPasswordValid) {
                return new user_response_1.UserResponseDto(false, 'Invalid password', {
                    users: null,
                });
            }
            return new user_response_1.UserResponseDto(true, 'User validated successfully', {
                users: userData,
            });
        });
    }
    validateUserByPhoneNumber(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel
                .findOne({ phoneNumber: data.phoneNumber })
                .exec();
            if (!user) {
                return new user_response_1.UserResponseDto(false, 'User not found');
            }
            const isPasswordValid = yield bcrypt.compare(data.password, user.password);
            if (!isPasswordValid) {
                return new user_response_1.UserResponseDto(false, 'Invalid password');
            }
            return new user_response_1.UserResponseDto(true, 'User validated successfully');
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(tokenDevice_schema_1.TokenDevice.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        axios_1.HttpService,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map