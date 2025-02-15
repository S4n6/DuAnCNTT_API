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
exports.RMQ_CONFIG = exports.USER_CONSTANTS = exports.ROLE = void 0;
const microservices_1 = require("@nestjs/microservices");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.ROLE = {
    ADMIN: 'admin',
    USER: 'user',
    ORGANIZATION: 'organization',
    STUDENT: 'student',
    TEACHER: 'teacher',
};
exports.USER_CONSTANTS = {
    SECRET_HASH_PASSWORD: process.env.ENCODE_PASSWORD,
    MONGO_URL: process.env.MONGO_URL,
    HOST_AUTH_SERVICE: process.env.HOST_AUTH_SERVICE,
    PORT: process.env.USER_SERVICE_PORT,
};
exports.RMQ_CONFIG = {
    transport: microservices_1.Transport.RMQ,
    options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'user_queue',
        queueOptions: {
            durable: false,
        },
    },
};
//# sourceMappingURL=constant.js.map