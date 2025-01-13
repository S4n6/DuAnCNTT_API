import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { HttpModule } from '@nestjs/axios';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentEvent, DocumentEventSchema } from './document.schema';
import { DOCUMENTS_CONSTANTS } from './constants';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(DOCUMENTS_CONSTANTS.MONGO_URL),
    MongooseModule.forFeature([
      {
        name: DocumentEvent.name,
        schema: DocumentEventSchema,
      },
    ]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
