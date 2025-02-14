import { Module } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FORUM_CONSTANTS, RMQ_CONFIG } from './const';
import { PostSchema } from './post.schema';
import { CommentSchema } from './comment.schema';
import { ForumGateway } from './forum.gateway';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forRoot(FORUM_CONSTANTS.MONGO_URL),
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: PostSchema,
      },
      {
        name: 'Comment',
        schema: CommentSchema,
      },
    ]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        ...RMQ_CONFIG,
      },
    ]),
  ],
  controllers: [ForumController],
  providers: [ForumService, ForumGateway],
})
export class ForumModule {}
