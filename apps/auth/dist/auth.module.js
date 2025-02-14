"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = exports.grpcClientOptions = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constants");
const passport_1 = require("@nestjs/passport");
const microservices_1 = require("@nestjs/microservices");
const mongoose_1 = require("@nestjs/mongoose");
const token_schema_1 = require("./token.schema");
const google_strategy_1 = require("./strategy/google.strategy");
const axios_1 = require("@nestjs/axios");
exports.grpcClientOptions = {
    transport: microservices_1.Transport.GRPC,
    options: {
        package: 'user',
        protoPath: 'lib/common/user.proto',
        url: constants_1.AUTH_CONSTANTS.GRPC_HOST_USER_SERVICE,
    },
};
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'google' }),
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.JWT_SECRET,
            }),
            microservices_1.ClientsModule.register([
                Object.assign({ name: 'USER_PACKAGE' }, exports.grpcClientOptions),
                Object.assign({ name: 'RABBITMQ_SERVICE' }, constants_1.RMQ_CONFIG),
            ]),
            mongoose_1.MongooseModule.forRoot(constants_1.AUTH_CONSTANTS.MONGO_URL),
            mongoose_1.MongooseModule.forFeature([{ name: token_schema_1.Token.name, schema: token_schema_1.TokenSchema }]),
            axios_1.HttpModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, google_strategy_1.GoogleStrategy],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map