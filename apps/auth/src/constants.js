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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_CONSTANTS = exports.jwtConstants = void 0;
const dotenv = __importStar(require("dotenv"));
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
    SECRET_HASH_PASSWORD: process.env.ENCODE_PASSWORD,
    GG_CLIENT_ID: process.env.GG_CLIENT_ID,
    GG_CLIENT_SECRET: process.env.GG_CLIENT_SECRET,
    GG_CALLBACK_URL: process.env.GG_CALLBACK_URL,
    MONGO_URL: process.env.MONGO_URL,
};
//# sourceMappingURL=constants.js.map