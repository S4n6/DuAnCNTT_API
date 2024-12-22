"use strict";
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
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./auth.module");
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
dotenv.config();
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(auth_module_1.AuthModule);
        app.useGlobalPipes(new common_1.ValidationPipe());
        yield app.listen(constants_1.AUTH_CONSTANTS.PORT);
        console.log(`Auth service is running on: ${yield app.getUrl()}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map