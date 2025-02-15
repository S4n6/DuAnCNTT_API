"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const axios_1 = require("@nestjs/axios");
const tokenDevice_schema_1 = require("./tokenDevice.schema");
const constant_1 = require("./constant");
const jwt_strategy_1 = require("../../../lib/common/auth/jwt.strategy");
const microservices_1 = require("@nestjs/microservices");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(constant_1.USER_CONSTANTS.MONGO_URL),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: tokenDevice_schema_1.TokenDevice.name, schema: tokenDevice_schema_1.TokenDeviceSchema },
            ]),
            axios_1.HttpModule,
            microservices_1.ClientsModule.register([
                Object.assign({ name: 'RABBITMQ_SERVICE' }, constant_1.RMQ_CONFIG),
            ]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, jwt_strategy_1.JwtStrategy],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map