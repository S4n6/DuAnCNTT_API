"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_CONSTANTS = exports.jwtConstants = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.jwtConstants = {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN_REFRESH_TOKEN: process.env.JWT_EXPIRES_IN_REFRESH_TOKEN,
    JWT_EXPIRES_IN_ACCESS_TOKEN: process.env.JWT_EXPIRES_IN_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN_HASH_SECRET: process.env.JWT_REFRESH_TOKEN_HASH_SECRET,
};
exports.AUTH_CONSTANTS = {
    PORT: process.env.AUTH_SERVICE_PORT,
    GRPC_HOST_USER_SERVICE: process.env.GRPC_HOST_USER_SERVICE,
    SECRET_HASH_PASSWORD: process.env.SECRET_HASH_PASSWORD,
};
//# sourceMappingURL=constants.js.map