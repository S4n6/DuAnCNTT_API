"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grpcOptions = void 0;
const microservices_1 = require("@nestjs/microservices");
exports.grpcOptions = {
    transport: microservices_1.Transport.GRPC,
    options: {
        package: 'api',
        protoPath: 'lib/common/api.proto',
    },
};
//# sourceMappingURL=grpc.options.js.map