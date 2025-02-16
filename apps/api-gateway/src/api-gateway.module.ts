import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventController } from './modules/event.controller';
import { RMQ_CONFIG } from './config/rabbitmq.config';
import { DocumentController } from './modules/document.controller';
import { ParticipantsController } from './modules/participants.controller';
import { EmailController } from './modules/email.controller';
import { UserController } from './modules/user.controller';
import { AuthController } from './modules/auth.controller';
import { ForumController } from './modules/forum.controller';
import { JwtStrategy } from 'lib/common/auth/jwt.strategy';

@Module({
  imports: [ClientsModule.register(RMQ_CONFIG)],
  controllers: [
    // ApiGatewayController,
    EventController,
    // DocumentController,
    // ParticipantsController,
    // EmailController,
    // UserController,
    // AuthController,
    ForumController,
  ],
  providers: [ApiGatewayService, JwtStrategy],
})
export class ApiGatewayModule {}
