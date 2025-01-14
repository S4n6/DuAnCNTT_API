import { Module } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FORUM_CONSTANTS } from './const';
import { PostSchema } from './post.schema';
import { CommentSchema } from './comment.schema';
import { ForumGateway } from './forum.gateway';

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
  ],
  controllers: [ForumController],
  providers: [ForumService, ForumGateway],
})
export class ForumModule {}
